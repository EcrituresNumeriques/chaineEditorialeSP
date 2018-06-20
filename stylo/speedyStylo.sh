curl -o $1.zip https://stylo.ecrituresnumeriques.ca/api/v1/zipVersion/$2
curl -o $1.html https://stylo.ecrituresnumeriques.ca/api/v1/htmlVersion/$2
wget -nd -p -H -P media/ -A jpeg,jpg,bmp,gif,png -e robots=off https://stylo.ecrituresnumeriques.ca/api/v1/htmlVersion/$2
unzip $1.zip
rename "s/${2}/${1}/g" *
sed -i -e "s/\/${2}/${1}/g" $1.yaml
pandoc --standalone --filter pandoc-citeproc --template=/home/marcello/Desktop/sp/git/chaineEditorialeSP/templates/templateLaTeX.latex -f markdown -t latex $1.md $1.yaml -o $1.md.tex
cp -r ../media ./
sed -i -e 's/https:\/\/i\.imgur.com\//media\//g' $1.md
sed -i -e 's/https:\/\/i\.imgur.com\//media\//g' $1.html
sed -i -e 's/https:\/\/i\.imgur.com\//media\//g' $1.md.tex
pdflatex $1.md.tex
rm $1.zip
git status
