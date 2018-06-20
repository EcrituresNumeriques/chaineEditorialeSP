# Script pour télécharger les fichiers édités sur stylo

Le script sert à automatiser le téléchargement des articles depuis Stylo et la production du pdf.

Le script prend deux arguments: l'identifiant de l'article (SPXX) et l'identifiant de la version Stylo.

Par exemple:
```./speedyStylo.sh SP1234 5b05b9cd35341a1100a1cfca```

L'identifiant Stylo est la série de caractères à la fin de l'url Stylo. Par exemple, si l'url est

```https://stylo.ecrituresnumeriques.ca/write/5b05b9cd35341a1100a1cfca```

l'identifiant sera 
```
5b05b9cd35341a1100a1cfca
```

## Ce que fait le script

1. Il télécharge le zip
2. Il le décompresse
3. Il renomme les fichiers avec le bon nom
4. Il télécharge le html
5. Il change le nom du fichier bibliographique dans le yaml
6. Il produit le .tex
7. Il copie les images dans le dossier media (qui doit être dans ../)
8. Il télécharge les images dans l'article et les mets dans le dossier media (les images doivent avoir url https://i.imgur.com/nomDeLimage.jpg ou jpeg ou png ou bmp ou gif)
9. Il prodit le pdf
10. Il donne les infos sur le status git

Après avoir fait tourner le script il reste

1. À télécharger manuellement le xml
2. git add .
3. git push

## Software requis
Il est nécessaire d'avoir installé (outre pandoc et LaTeX):

1. rename
2. curl

Pour installer rename:

```
sudo apt install rename
```

Pour installer curl:

```
sudo apt install curl
```

## Avant de faire tourner le script

1. Rendre le script executable (```chmod 755 speedyStylo.sh```) 

2. Se placer dans le dossier où on veut télécharger les fichiers

3. Se mettre sur la branch de l'article en question

## Todo

- automatiser la création du xml

