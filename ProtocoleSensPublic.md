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
- [media] (dossier créé lorsque le document comprend des images)

Si le dossier `media` n'existe pas :
  * créer un dossier media et copier y les deux fichiers `../chaineEditorialeSP/logo.png` et `../chaineEditorialeSP/crochets.png`

Désormais, le fichier markdown `SPxxxx.docx.md` vous sert de fichier de travail et sera le format pivot.

## Etape 2 : Edition de l'article

Un article est composé par plusieurs fichiers :

* Yaml : SPxxxx.yaml - fichier de métadonnées au format Yaml
* Markdown : SPxxxx.docx.md - contenu de l'article au format Markdown
* Bibtex : SPxxxx.bib - fichier de bibliographie au format Bibtex

Le contenu de l'article est composé par :
- corps de texte : l'article
- notes de bas de page

### 2.1 : Métadonnées - SPxxxx.yaml
- copier le fichier `../chaineEditorialeSP/modeleYaml.yaml` dans le dossier `SPxxxx` et le renommer `SPxxxx.yaml`
- remplir les champs tel que spécifié dans le modèle et selon les règles générales suivantes :

**Règles générales à suivre:**
  - si un titre ou un résumé comprend ":", le remplacer avec &#58; (les : ne sont pas admis)
  - si un titre ou résumé doit intégrer des termes en italiques, utiliser : `\<em\>Contenu en italiques\</em\>`. Ce qui correspond à du html "échappé". Autrement dit, la syntaxe markdown est interdite, et la syntaxe html doit être "échappée".
  - les `controlledKeywords` renvoient aux mots-clés de référence sur Sens public. Pour remplir les champs, se référer au document autoritesRAMEAU. dans le dosier Edition. ! Tous les mots-clés ne sont pas forcément inclus dans le doc de référence. Vous pouvez aussi en créer. Dans ce cas, il faut consulter la [base des autorités Rameau](http://catalogue.bnf.fr/recherche-autorite.do?pageRech=rat).
  - les `keyword_fr/en` (ou autre langue) renvoient aux mots-clés choisis par l'auteur. (Parfois, il peut s'agir des mêmes mots-clés que ceux de SP).
  - supprimer tout champ qui ne serait pas renseigné.
  - ne pas oublier de toujours renseigner le champ langue.
  - dans le cas d'une date commençant par un zéro, mettre le numéro entre guillemets sinon le zéro n'est pas pris en compte. Exemple :
    * `01` devient `1` (pas correct)
    * `"01"` devient `01` (correct)

### 2.2 Corps de l'article - SPxxxx.docx.md
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


## Etape 3: Bibliographie - SPxxxx.bib

Il est prévu que l'auteur fournit un fichier Bibtex. Dans ce cas, le renommer `SPxxxx.bib` et l'enregistrer dans le dossier `SPxxxx`.

Dans le cas contraire, créer sur Zotero la biblio de l'article, à partir de la biblio déjà présente dans l'article + des notes de bas de page, puis exporter un fichier Bibtex sous le nom `SPxxxx.bib` dans le dossier `SPxxxx`.

Dans le fichier Markdown, réintégrer les références suivant les recommandations de l'auteur.
  * dans SPxxxx.bib : `giddens_consequences_1990`
  * dans SPxxxx.docx.md :  
    `Malgré sa dissimulation et notre immersion dans l’ère du numérique, le tas d’or conserve une grande réalité ; contrairement à ce que suggère Giddens [@giddens_consequences_1990, p. 25] en mettant en exergue le phénomène de l’argent désincarné dans les sociétés modernes, qui est celui de l’entrepreneur, l’argent matérialisé du cupide continue d’impressionner et d’exciter.`
  * résultat final affiché :  
    `Malgré sa dissimulation et notre immersion dans l’ère du numérique, le tas d’or conserve une grande réalité ; contrairement à ce que suggère Giddens (Giddens 1990, 25) en mettant en exergue le phénomène de l’argent désincarné dans les sociétés modernes, qui est celui de l’entrepreneur, l’argent matérialisé du cupide continue d’impressionner et d’exciter.`

* Dans le Yaml, vérifier les 3 champs relatifs à la bibliographie :

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

## Étape 4 : Conversion md2html

Dans le cas d'un article avec une bibliographie, lancer la commande suivante :

    pandoc --standalone --ascii --filter pandoc-citeproc --template=../chaineEditorialeSP/templates/templateHtmlDcV0.html5 -f markdown -t html SPxxxx.docx.md SPxxxx.yaml -o SPxxxx.html

Dans le cas d'un article sans bibliographie, lancer la commande :

    pandoc --standalone --ascii --template=../chaineEditorialeSP/templates/templateHtmlDcV0.html5 -f markdown -t html SPxxxx.docx.md SPxxxx.yaml -o SPxxxx.html


Vous devez maintenant avoir 6 fichiers dans votre dossier :

- fichier source (définitif auteur)
- SPxxxx.docx
- SPxxxx.docx.md
- SPxxxx.yaml
- SPxxxx.bib
- SPxxxx.html


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

* retourner dans le terminal et lancer successivement les 3 commandes suivantes :

- dans le cas d'un article avec biblio:
      pandoc --standalone --filter pandoc-citeproc --template=../chaineEditorialeSP/templates/templateLaTeX.latex -f markdown -t latex SPXXXX.docx.md SPXXXX.yaml -o SPXXXX.docx.md.tex  

      pdflatex SPXXXX.docx.md.tex  

      pdflatex SPXXXX.docx.md.tex

- dans le cas d'un article sans biblio:

      pandoc --standalone  --template=../chaineEditorialeSP/templates/templateLaTeX.latex -f markdown -t latex SPXXXX.docx.md SPXXXX.yaml -o SPXXXX.docx.md.tex

      pdflatex SPXXXX.docx.md.tex  

      pdflatex SPXXXX.docx.md.tex

* Vous devez avoir pour terminer 6 fichiers dans votre dossier :
- fichier source (définitif auteur)
- SPxxxx.docx
- SPxxxx.docx.md
- SPxxxx.yaml
- SPxxxx.bib
- SPxxxx.html
- SPxxxx.pdf

* Ne pas oublier de joindre le .pdf à l'article sur SPIP.
