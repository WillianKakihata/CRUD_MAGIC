Para baixar o rabbitmq e criar uma imagem docker
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:4.0-management

Para baixar as dependencias e começar o projeto, é necessário entrar no arquivo 
- cd CardsCrud
- npm i

para iniciar o servidor localmente:
- cd CardsCrud
- cd apps
- npm run start:dev 'CRUD' <- para iniciar o servidor local do aplicativo do Magic
- npm run start":dev 'notification_queue' <- para iniciar o servidor local da fila de notificacao
- npm run start":dev 'rmq-process' <- para iniciar o servidor local da fila de importacao

- PASTA CRUD
É um
