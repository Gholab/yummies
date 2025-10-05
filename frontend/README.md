# Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.2.

## Utilisation des différentes configuration

Pour lancer le front en mode "pure front", lancer :

```npm start```

Pour lancer le front en mode "BFF", lancer :

```npm start -- configuration=bff```

### Gérer les différentes implémentations de services
Prenons ici l'exemple du menu service.
Pour chaque service, on crée un dossier qui contient :
* la classe abstraite (`menu.service.ts` contenant `abstract class MenuService`), regroupant tout le code commun aux deux archis
* l'implémentation "pure front" (`purefront-menu.service.ts` contenant `class PurefrontMenuService extends MenuService`)
* l'implémentation "BFF" (`bff-menu.service.ts` contenant `class BFFMenuService extends MenuService`)

Dans le fichier `services.token.ts`, bien définir un `InjectionToken` associé au service.

Dans `app.config.ts`, ajouter à `BFF_PROVIDERS` et `PUREFRONT_PROVIDERS` les providers associés aux implémentations concrètes des services pour chaque architecture.

Enfin, lorsqu'un composant souhaite importer un service, il importe la classe abstraite et l'`InjectionToken` associé, et l'injecte via le token dans son constructeur.

exemple pour importer un service dans un composant :
```typescript
import {MenuService} from '../../services/menu/menu.service';
import {MENU_SERVICE} from '../../services/services.token';

export class TestMenu implements OnInit {
  constructor(@Inject(MENU_SERVICE) private menuService: MenuService) {
  }
  //...
}
```


# Simulation
Pour voir l'évolution des tables, deux pages sur le front sont importantes :
* `/check-status` : permet de voir la liste des commandes en cours, leur statut, d'en créer ou d'en supprimer. Lorsqu'on en crée une, elle a des valeurs par défaut.
* `/update-status` : cette page, lorsqu'elle est ouverte, checke si il ya des commandes. Si oui, elle simule tous les appels qui auraient été fait en cuisine, et valide l'order.


Donc, :warning: IL NE FAUT PAS GARDER OUVERT L'ONGLET "/update-status". Il faut juste ouvrir cette page lorsque l'on veut valider les orders.
