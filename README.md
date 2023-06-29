# apiStarWars Victor Cousseau

Le modèle de Richardson doit respecter plusieurs points qui sont les suivants : 

1. L’API respecte le modèle de données et chaque ressource peut être identifiée avec une URL. Ce qui est le cas dans mon API.
2. Utilisation des méthodes HTTP autres que GET et POST pour signifier l’action souhaitée : PUT / DELETE. Et aussi le gestion des status codes pour gérer une situation.
3. L'Hypermedia Control. L'hypermedia est l’une des principales règles de la thèse de Fielding.
L’idée est de retrouver dans les API ReST la même logique Hypermedia qu’en HTML par exemple. Aujourd’hui, cela se résume principalement par la présence de liens dans les ressources permettant de définir la relation avec d’autres ressources.

Je n'ai m'alheureusement pas eu le temps de mettre en place ce dernier point faute de temps du a la réfactorisation totale de mon API.
