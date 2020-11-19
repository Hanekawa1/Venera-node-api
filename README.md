# Venera-node-api

## Projeto utilizado como Trabalho de Conclusão de Curso - TCC
## Bacharelado em Sistemas de Informação - UNIPAM - 2020

A plataforma tem como objetivo criar um ambiente de análise de dados e indicadores gerados a partir de uma análise de sentimento realizado em comentários coletados em redes sociais diversas sobre determinado assunto, sendo neste contexto Instituições de Ensino.

São 3 projetos, incluindo esse, que são

* 1 - Venera-python-api: api responsável por coletar os comentários das redes sociais.
* 2 - Venera-node-api: api responsável por realizar a análise de sentimento dos comentários coletados.
* 3 - Venera-Analysis: interface da aplicação.

A api em node foi criada utlizando ExpressJS para criação/suporte a RESTFUL e consome o serviço da Azure Cognitive Services - Text Analysis para realizar a análise de sentimento.
Os comentários e as análises são salvos/consultados no banco MongoDB.
