// Mostrar telas
function mostrarTelaCadastroConta() {
    document.getElementById('telaCadastroConta').classList.remove('hidden');
    document.getElementById('telaLogin').classList.add('hidden');
    document.getElementById('main').classList.add('hidden');
}

function mostrarTelaLogin() {
    document.getElementById('telaCadastroConta').classList.add('hidden');
    document.getElementById('telaLogin').classList.remove('hidden');
    document.getElementById('main').classList.add('hidden');
}

function mostrarPagina(pagina) {
    document.getElementById('cadastro').classList.add('hidden');
    document.getElementById('lista').classList.add('hidden');
    document.getElementById(pagina).classList.remove('hidden');
    if (pagina === 'lista') carregarVoluntarios();
}

function criarConta() {
    const nome = document.getElementById('nomeConta').value.trim();
    const email = document.getElementById('emailConta').value.trim();
    const senha = document.getElementById('senhaConta').value.trim();

    if (!nome || !email || !senha) {
        alert('Preencha todos os campos!');
        return;
    }

    let contas = JSON.parse(localStorage.getItem('contas')) || [];

    const existe = contas.some(c => c.email === email);
    if (existe) {
        alert('Email já cadastrado!');
        return;
    }

    contas.push({ nome, email, senha });
    localStorage.setItem('contas', JSON.stringify(contas));

    alert('Conta criada com sucesso!');
    document.getElementById('nomeConta').value = '';
    document.getElementById('emailConta').value = '';
    document.getElementById('senhaConta').value = '';

    mostrarTelaLogin();
}


function fazerLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const senha = document.getElementById('loginSenha').value.trim();

    const contas = JSON.parse(localStorage.getItem('contas')) || [];

    const usuario = contas.find(c => c.email === email && c.senha === senha);

    if (usuario) {
        document.getElementById('telaLogin').classList.add('hidden');
        document.getElementById('main').classList.remove('hidden');
        mostrarPagina('cadastro');
        alert('Login realizado com sucesso!');
    } else {
        alert('Email ou senha incorretos!');
    }
}

function logout() {
    document.getElementById('main').classList.add('hidden');
    mostrarTelaLogin();
}

async function buscarEndereco() { 
    const cep = document.getElementById('cep').value;
    if (cep.length !== 8) return;

    try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();

        if (data.erro) {
            alert('CEP não encontrado!');
            document.getElementById('endereco').value = '';
        } else {
            document.getElementById('endereco').value =
                `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
        }
    } catch (error) {
        alert('Erro ao buscar o endereço!');
    }
}


async function getWeatherData(cityName) {
    const apiKey = '5cc40a535ee76f268ff2b8b18efba636';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const results = await fetch(apiUrl);
        const json = await results.json();

        if (json.cod === 200) {
            return {
                temp: json.main.temp,
                tempMax: json.main.temp_max,
                tempMin: json.main.temp_min,
                description: json.weather[0].description,
                icon: json.weather[0].icon,
                humidity: json.main.humidity,
                windSpeed: json.wind.speed,
            };
        } else {
            console.warn(`Erro ao buscar clima para ${cityName}: ${json.message}`);
            return null; 
        }
    } catch (error) {
        console.error('Erro na requisição da API de clima:', error);
        return null; 
    }
}

async function cadastrarVoluntario(event) { 
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const cep = document.getElementById('cep').value.trim();
    const endereco = document.getElementById('endereco').value.trim(); 

    if (!nome || !email || !cep) {
        alert('Preencha todos os campos!');
        return;
    }

    let voluntarios = JSON.parse(localStorage.getItem('voluntarios')) || [];

    const existe = voluntarios.some(v => v.email === email || v.nome.toLowerCase() === nome.toLowerCase());
    if (existe) {
        alert('Voluntário já cadastrado!');
        return;
    }

    
    const enderecoParts = endereco.split(',');
    const cidadeVoluntario = enderecoParts.length > 2 ? enderecoParts[2].trim().split('-')[0].trim() : ''; 

    let climaData = null;
    if (cidadeVoluntario) {
        climaData = await getWeatherData(cidadeVoluntario); 
    }

    const voluntario = {
        nome,
        email,
        endereco,
        foto: `https://source.unsplash.com/160x160/?volunteer,${voluntarios.length + 1}`,
        clima: climaData 
    };

    voluntarios.push(voluntario);
    localStorage.setItem('voluntarios', JSON.stringify(voluntarios));
    alert('Voluntário cadastrado com sucesso!');

    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('cep').value = '';
    document.getElementById('endereco').value = '';
}


function carregarVoluntarios() {
    const container = document.getElementById('cards');
    container.innerHTML = '';

    const voluntarios = JSON.parse(localStorage.getItem('voluntarios')) || [];
    const filtroNome = document.getElementById('filtroNome').value.toLowerCase();

    const voluntariosFiltrados = voluntarios.filter(v => 
        v.nome.toLowerCase().includes(filtroNome)
    );

    if (voluntariosFiltrados.length === 0 && filtroNome !== '') {
        container.innerHTML = '<p style="text-align: center; color: #555;">Nenhum voluntário encontrado com esse nome.</p>';
        return;
    }

    voluntariosFiltrados.forEach((v, index) => {
        const card = document.createElement('div');
        card.className = 'card';

        let climaHtml = '';
        if (v.clima) {
            climaHtml = `
                <div class="clima-info">
                    <h4>Clima em ${v.endereco.split(',')[2] ? v.endereco.split(',')[2].trim().split('-')[0].trim() : 'Cidade'}</h4>
                    <img src="https://openweathermap.org/img/wn/${v.clima.icon}@2x.png" alt="Ícone do Clima" class="clima-icon">
                    <p class="temp-value">${v.clima.temp.toFixed(0)}<sup>C°</sup></p>
                    <p class="temp-desc">${v.clima.description}</p>
                    <div class="clima-details">
                        <span>Max: ${v.clima.tempMax.toFixed(0)}<sup>C°</sup></span> |
                        <span>Min: ${v.clima.tempMin.toFixed(0)}<sup>C°</sup></span>
                    </div>
                    <div class="clima-details">
                         <span>Hum: ${v.clima.humidity}%</span> |
                         <span>Vento: ${v.clima.windSpeed.toFixed(0)}km/h</span>
                    </div>
                </div>
            `;
        } else {
            climaHtml = '<p class="no-clima">Clima não disponível para esta cidade.</p>';
        }

        card.innerHTML = `
            <img src="${v.foto}" alt="Foto">
            <h3>${v.nome}</h3>
            <p><strong>Email:</strong> ${v.email}</p>
            <p><strong>Endereço:</strong> ${v.endereco}</p>
            ${climaHtml}
            <button onclick="removerVoluntario(${index})">Remover</button>
        `;

        container.appendChild(card);
    });
}


function removerVoluntario(index) {
    let voluntarios = JSON.parse(localStorage.getItem('voluntarios')) || [];

    if (confirm(`Deseja realmente remover o voluntário ${voluntarios[index].nome}?`)) {
        voluntarios.splice(index, 1);
        localStorage.setItem('voluntarios', JSON.stringify(voluntarios));
        carregarVoluntarios(); 
    }
}


function limparTudo() {
    if (confirm('Deseja realmente excluir todos os voluntários?')) {
        localStorage.removeItem('voluntarios');
        carregarVoluntarios();
    }
}


function filtrarVoluntarios() {
    carregarVoluntarios(); 
}


document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city_name').value;

    if (!cityName) {
        document.querySelector("#weather").classList.remove('show');
        showAlert('Você precisa digitar uma cidade...');
        return;
    }

    const climaData = await getWeatherData(cityName); 

    if (climaData) {
        showInfo({
            city: cityName, 
            country: 'BR', 
            temp: climaData.temp,
            tempMax: climaData.tempMax,
            tempMin: climaData.tempMin,
            description: climaData.description,
            tempIcon: climaData.icon,
            windSpeed: climaData.windSpeed,
            humidity: climaData.humidity,
        });
    } else {
        document.querySelector("#weather").classList.remove('show');
        showAlert(`Não foi possível localizar o clima para "${cityName}". Verifique o nome da cidade.`);
    }
});

function showInfo(json){
    showAlert('');
    document.querySelector("#weather").classList.add('show');

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;
    document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector('#temp_description').innerHTML = `${json.description}`;
    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)}km/h`;
}

function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}