# Mini-blog

## Sobre o projeto

Uma aplicação que funciona de maneira semelhante a um blog, onde o usuário pode criar uma conta, fazer login, postar algum artigo e editar esse mesmo artigo. O projeto foi realizado visando o estudo em React e aprendendo sobre o firebase.

## Páginas da aplicação

- **Página inicial**

![Página inicial da aplicação, onde será listado os posts que o usuário poderá ler e a primeira tela ao entrar ao site](./assets/pagina-inicial.jpeg)

- **Página de login**

![Página em que o usuário poderá realizar o login, caso já tenha criado uma conta](./assets/pagina-login.jpeg)

- **Página de cadastro**

![Página em que o usuário poderá criar um conta para poder criar posts na aplicação, após criar sua conta a aplicação já entenderá e irá fazer o login](./assets/pagina-criar-post.jpeg)

- **Página sobre**

![A página sobre contém uma mini descrição sobre o projeto e um botão que encaminha ao usuário fazer login ou criar um post caso já esteja logado](./assets/pagina-sobre.jpeg)

- **Página Criar posts**

![Destinada a criação de posts a página contém um formulário com informações que seram usadas ao postar](./assets/pagina-criar-post.jpeg)

- **Página Dashboard**

![A página dashboard será onde aparecerá os posts já criados pela pessoa logada e ações que lhe seram permitidas, como Ver o post, editar o post, e exclui-lo](./assets/pagina-dashboard.jpeg)

- **Página Editar Post**

![Após clicar em editar um post, o usuário será enviado para esta página da aplicação onde poderá editar as informações do post através do mesmo formulário de criação](./assets/pagina-editar-post.jpeg)

- **Página Search**

![Após ser feito alguma pesquisa através das tags desejadas, a aplicação filtra os posts que possuem estas tags e mostram na tela](./assets/pagina-pesquisa.jpeg)

## Como testar

- Crie uma conta e um banco de dadosno site do firebase, após isso você poderá configurar o arquivo ```.env``` com as seguintes chaves:

```env
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_APP_ID=
```

- Utilize o comando ```npm install``` para instalar as depêndencias;

- Então utilize o comando ```npm start``` para iniciar a aplicação e poder abrir o link gerado no navegador.
