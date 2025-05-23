## Como Manusear o Projeto (Guia Rápido)

Ao abrir o `index.html` no seu navegador, você será direcionado para a tela de login/cadastro. Siga os passos abaixo para usar as funcionalidades principais:

### 1. Criar uma Nova Conta (Primeiro Acesso)

Se você é um usuário novo, precisará criar uma conta primeiro:
* Na tela inicial, você verá o formulário "Criar Conta".
* Preencha os campos **Nome**, **Email** e **Senha**.
* Clique no botão **Cadastrar**.
* Uma mensagem de "Conta criada com sucesso!" aparecerá.
* Você será automaticamente redirecionado para a tela de **Fazer Login**.

### 2. Fazer Login

Depois de criar uma conta ou se você já tiver uma:
* Na tela de login, insira seu **Email** e **Senha** que você cadastrou.
* Clique no botão **Login**.
* Se suas credenciais estiverem corretas, uma mensagem de "Login realizado com sucesso!" aparecerá e você será levado para a tela principal da aplicação, que começa com o formulário de Cadastro de Voluntários.

### 3. Navegar Entre as Telas Principais

Após o login, você verá botões na parte superior para navegar:
* **Cadastrar Voluntário:** Leva você para o formulário de cadastro de novos voluntários.
* **Listar Voluntários:** Mostra todos os voluntários cadastrados em formato de cards.

### 4. Cadastrar um Novo Voluntário

Na seção "Cadastrar Voluntário":
* Preencha o **Nome** do voluntário.
* Preencha o **Email** do voluntário.
* Digite o **CEP** do voluntário. Assim que você digitar um CEP válido, o campo **Endereço Completo** será preenchido automaticamente pela API do ViaCEP.
* Clique no botão **Cadastrar**.
* Uma mensagem de "Voluntário cadastrado com sucesso!" aparecerá e o formulário será limpo. O novo voluntário aparecerá na lista quando você for para a tela de "Listar Voluntários".

### 5. Visualizar e Gerenciar Voluntários (Listar Voluntários)

Na seção "Listar Voluntários":
* Todos os voluntários cadastrados serão exibidos em **cards** individuais.
* Cada card mostrará o **Nome**, **Email**, **Endereço Completo** e uma **Foto de Perfil Aleatória**.
* Se a cidade do voluntário for reconhecida, o card também exibirá informações sobre o **clima atual** daquela localidade.

#### Funcionalidades na lista:
* **Filtrar por Nome:** Use o campo de busca (geralmente acima dos cards) e digite parte do nome do voluntário que você quer encontrar. A lista se ajustará automaticamente.
* **Remover Voluntário:** Em cada card, há um botão **Remover**. Clique nele para excluir um voluntário específico. Será pedida uma confirmação.
* **Limpar Tudo:** No final da lista, você encontrará um botão **Limpar Tudo**. **Use com cautela!** Ele apagará *todos* os voluntários cadastrados.

### 6. Desconectar (Logout)

* A qualquer momento, você pode clicar no botão **Logout** (geralmente no cabeçalho ou menu de navegação).
* Você será desconectado e redirecionado de volta para a tela de **Fazer Login**.
* **Inatividade:** Se você ficar 5 minutos sem interagir com a página, o sistema irá desconectá-lo automaticamente por segurança e voltará para a tela de login.