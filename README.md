# Rota de Viagem #
 
Um turista deseja viajar pelo mundo pagando o menor preço possível independentemente do número de conexões necessárias.
Vamos construir um programa que facilite ao nosso turista, escolher a melhor rota para sua viagem.
 
Para isso precisamos inserir as rotas através de um arquivo de entrada.
 
## Input Example ##
```csv
GRU,BRC,10
BRC,SCL,5
GRU,CDG,75
GRU,SCL,20
GRU,ORL,56
ORL,CDG,5
SCL,ORL,20
```
 
## Explicando ##
Caso desejemos viajar de **GRU** para **CDG** existem as seguintes rotas:
 
1. GRU - BRC - SCL - ORL - CDG ao custo de **$40**
2. GRU - ORL - CGD ao custo de **$64**
3. GRU - CDG ao custo de **$75**
4. GRU - SCL - ORL - CDG ao custo de **$48**
5. GRU - BRC - CDG ao custo de **$45**
 
O melhor preço é da rota **1** logo, o output da consulta deve ser **GRU - BRC - SCL - ORL - CDG**.
 
 
### Dependências ###
   - node - v12.16.1
   - yarn - 1.22.4
 
### Execução do programa ###
 
#### Instalação das dependências do projeto
 
```cmd
$ yarn install
```
 
#### Execução
 
Inicialização do servidor REST
```cmd
$ yarn start-server input-example.csv
```
 
Execução por linha de comando
```cmd
$ yarn best-flight input-example.csv
```

# Estrutura dos arquivos/pacotes
```
| app - Aplicação
| app | CLI - Interface de linha de comando
| app | Dijkstra - Pacote do algoritmo de caminho mínimo
| app | Http - Interface de comunicação HTTP
| app | Http | Controller - Camada de interpretação HTTP
| app | Router - Controlador de endpoints
| app | Services - Camada de regras de negócios
| app | index.js - Arquivo de start do projeto
```
 
# Solução

Para a resolução do problema, foi utilizado o algoritmo dijkstra, que tem como base o uso de grafos para simular vértices e arestas, e nos dá a possibilidade de adicionar um peso para cada aresta percorrida. 

![Dijkstra](https://upload.wikimedia.org/wikipedia/commons/5/57/Dijkstra_Animation.gif)


"O algoritmo considera um conjunto S de menores caminhos, iniciado com um vértice inicial I. A cada passo do algoritmo busca-se nas adjacências dos vértices pertencentes a S aquele vértice com menor distância relativa a I e adiciona-o a S e, então, repetindo os passos até que todos os vértices alcançáveis por I estejam em S. Arestas que ligam vértices já pertencentes a S são desconsideradas."  [Referencia](https://pt.wikipedia.org/wiki/Algoritmo_de_Dijkstra)

## Solução tecnológica

Por que nodejs, é simples e intuitivo, a inicialização de um servidor REST e implementação de testes de unidade e aceitação é simplificada.

Contrapartida, nodejs não é o mais indicado para realizar os tipo de cálculo em grande massas de dados, mas para o desafio proposto foi a solução mais rápida e eficiente.

# Documentação da interface REST
 
#### Criação de novas rotas
- **URI:** flights/routes
- **METHOD:** POST
- **REPONSE:** OK
- **Payload:**
```json
[
   [
       "GRU",
       "BRC",
       10
   ],
   [
       "BRC",
       "SCL",
       5
   ],
   [
       "GRU",
       "CDG",
       75
   ],
   [
       "GRU",
       "SCL",
       20
   ],
   [
       "GRU",
       "ORL",
       56
   ],
   [
       "ORL",
       "CDG",
       5
   ],
   [
       "SCL",
       "ORL",
       20
   ]
]
```
 
#### Busca da melhor rota de voo
- **URI:** flights/routes/to/:to/from/:from
- **METHOD:** GET
- **PAR METROS**:
   - **to**: Origem da viagem
       - Obrigatório
       - string
   - **from**: Destino da viagem
       - Obrigatório
       - string
- **REPONSE:**
 
```json
{
   "bestRoute": [
       "GRU",
       "BRC",
       "SCL",
       "ORL",
       "CDG"
   ],
   "price": 40
}
```
# Documentação da interface CLI
 
A execução do comando `yarn best-flight input-routes.csv` irá solicitar a seguinte pergunta: `Please enter the route:`, podendo ser respondia com to-from, sendo obrigatório o uso do '-' separando a origem do destino.
 
Exemplo de resposta: **best route: GRU, BRC, SCL, ORL, CDG > 40**

