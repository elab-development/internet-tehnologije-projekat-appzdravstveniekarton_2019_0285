<?php

return [

    'paths' => ['api/*'],  // Ovde možete navesti rute za koje želite da omogućite CORS, npr. 'api/*'

    'allowed_methods' => ['*'],  // Dozvoljeni HTTP metodi, '*' znači svi

    'allowed_origins' => ['*'],  // Dozvoljeni domeni, '*' znači svi. Možete ovde navesti specifične domene, npr. 'https://example.com'

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],  // Dozvoljeni HTTP zaglavlja, '*' znači svi

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,  // Postavite na true ako želite da podržite kolačiće (credentials) u CORS zahtevima

];

