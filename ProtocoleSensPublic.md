# Protocole d'édition Sens public

<!-- dans dossier édition, intégrer un YAML de référence + Autorités RAMEAU -->

## Prérequis
* Installation pandoc

## Etape 1 : création du fichier pivot md
* Créer un Article vide sur SPIP pour générer le numéro d'article (xxxx)

* Dans Dropbox/Senspublic/Suivi_article/Edition, créer un ss dossier "SPxxxx"
- Copier le docx à traiter (version finale après révision) dans le dossier "SPxxxx"
- le dupliquer et le renommer "SPxxxx.docx"
- ouvrir un terminal, et se placer dans le sous-dossier "SPxxxx"
- lancer la commande suivante :
      pandoc -f docx -t markdown --extract-media=./ --atx-headers SPxxxx.docx -o SPxxxx.docx.md

Vous devez maintenant avoir 3 fichiers dans votre dossier :
- fichier source (définitif auteur)
- SPxxxx.docx
- SPxxxx.docx.md

Désormais, le fichier md vous sert de fichier de travail et sera le format pivot.

## Etape 2 : travail sur le md
Le document est composé du :
- yaml: contient toutes les métadonnées
- corps de texte : l'article
- notes de bas de page

- la bibliographie est contenue dans un fichier SPxxxx.bib (voir partie )

### 2.1 : travail sur le yaml
- ouvrir le fichier modeleYaml.md et copier tout le contenu
- coller le contenu au tout début de votre fichier SPxxxx
- remplir les champs tel que spécifié dans le modèle

* Règles générales à suivre:
  - si un titre ou un résumé comprend ":", le remplacer avec &#58; (les : ne sont pas admis)
  - les `controlledKeywords` renvoient aux mots-clés de référence sur Sens public. Pour remplir les champs, se référer au document autoritesRAMEAU. dans le dosier Edition. ! Tous les mots-clés ne sont pas forcément inclus dans le doc de référence. Vous pouvez aussi en créer. Dans ce cas, il faut consulter la [base des autorités Rameau](http://catalogue.bnf.fr/recherche-autorite.do?pageRech=rat).
  - les `keyword_fr/en` (ou autre langue) renvoient aux mots-clés choisis par l'auteur. (Parfois, il peut s'agir des mêmes mots-clés que ceux de SP).
  - supprimer tout champ qui ne serait pas renseigné.
  - ne pas oublier de toujours renseigner le champ langue.

### 2.2 travail sur l'article
* Vérifier que le corps de l'article ne contient ni titre, ni auteur, ni résumé ou mot-clé (tous ces éléments doivent être inclus dans le yaml)

* Vérifier le document dans son ensemble, identifier les éléments problématiques comme:
  - des balises italique mal placées
  - des [ ] / qui sont apparus  
  - vérifier que toutes les citations ont été prises en compte
  - pour les exposants : vérifier que l'exposant soit bien entre ^ (comme ceci: `XX^e^ siècle`).

* Espaces insécables :
  - vérifier qu'il y a toujours un espace avant :;!? » et après «
  - puis

* Ajouter un niveau de titre # pour chaque titre

* Images <!-- à définir-->

* Listes <!-- à définir-->


## Etape 3: Travail sur la bibliographie

* Normalement, l'auteur fournit un fichier .bib. Le renommer "SPxxxx.bib" et l'enregistrer dans le dossier SPxxxx.

* Sinon, créer sur Zotero la biblio de l'article, à partir de la biblio déjà présente dans l'article + des notes de bas de page, puis exporter un fichier bibtex sous le nom "SPxxxx.bib" dans le dossier SPxxxx.

* Dans le fichier .md, réintégrer les références suivant les recommandations de l'auteur.
  * dans SPxxxx.bib : `giddens_consequences_1990`
  * dans SPxxxx.docx.md :  
    `Malgré sa dissimulation et notre immersion dans l’ère du numérique, le tas d’or conserve une grande réalité ; contrairement à ce que suggère Giddens [@giddens_consequences_1990, p. 25] en mettant en exergue le phénomène de l’argent désincarné dans les sociétés modernes, qui est celui de l’entrepreneur, l’argent matérialisé du cupide continue d’impressionner et d’exciter.`
  * résultat final affiché :  
    `Malgré sa dissimulation et notre immersion dans l’ère du numérique, le tas d’or conserve une grande réalité ; contrairement à ce que suggère Giddens  (Giddens 1990, 25) en mettant en exergue le phénomène de l’argent désincarné dans les sociétés modernes, qui est celui de l’entrepreneur, l’argent matérialisé du cupide continue d’impressionner et d’exciter.`

* Dans la partie Yaml du fichier .md, vérifier les 3 champs relatifs à la bibliographie :

      ---
      bibliography: SPxxxx.bib
      link-citations: true
      nocite: |
      ---

  * dans le cas d'une référence non citée dans le texte, ajouter la clé de la bibliographie dans le champs `nocite:` comme suit :

        ---
        bibliography: SPxxxx.bib
        link-citations: true
        nocite: |
          @monjour_litterature_2016, @monjour_dibutade_2015
        ---

## Étape 4 : conversion md2html

* Retourner dans le terminal et lancer la commande suivante :  
  `pandoc --standalone --ascii --filter pandoc-citeproc --template=../templates/templateHtmlDcV0.html5 -f markdown -t html SPxxxx.docx.md -o SPxxxx.html`

* Vous devez maintenant avoir 5 fichiers dans votre dossier :
- fichier source (définitif auteur)
- SPxxxx.docx
- SPxxxx.docx.md
- SPxxxx.bib
- SPxxxx.docx.md.html

## Étape 5 : intégration de l'article sur SPIP

* Retourner dans l'article SPxxxx créé au départ

* Insérer les métadonnées :
    - Nom de l'auteur
    - Titre (et sous-titre si pertinent)
    - Renseigner le champ "à l'intérieur de la rubrique" en fonction de la nature de l'article.
    - Sélectionner les mots-clés (= ControlledKeywords définis dans le yaml)
    - Ajouter le mot-clé "focus" si nécessaire (pour afficher l'article sur la page d'accueil)
    - Si pertinent, renseigner les parties langue et traduction + articles liés
    - Dans "Descriptif rapide", insérer le {{résumé :}} en fr et en + les {{mots-clés : }} en fr et en, comme suit:  
  `{{Mots-clés}}`

* Dans la partie Texte:
    - sélectionner "source" et copier-coller le fichier html **sans intégrer toutes les métadonnées**. Ce qui veut dire que vous sélectionnez le texte qui se trouve entre les balises <body> </body> (sans prendre en compte celles-ci).
    - Enregistrer

* Insérer le logo

* Prévisualiser
    - Toutes les modifications nécessaires doivent être apportées d'abord dans le fichier SPxxxx.docx.md

* Une fois parvenus à une version définitive, créer le pdf (voir partie ci-dessous) et joindre le pdf à l'article sur SPIP.

## Création du fichier pdf.

* retourner dans le terminal et insérer la commande blabla

* Vous devez avoir pour terminer 6 fichiers dans votre dossier :
- fichier source (définitif auteur)
- SPxxxx.docx
- SPxxxx.docx.md
- SPxxxx.bib
- SPxxxx.docx.md.html
- SPxxxx.docx.md.html.pdf

* Ne pas oublier de joindre le .pdf à l'article sur SPIP.
