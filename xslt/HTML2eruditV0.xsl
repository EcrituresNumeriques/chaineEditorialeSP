<?xml version="1.0" encoding="UTF-8"?>

<!--Ce script sert pour transformer des html créés avec pandoc templateHtmlEruditV0.html5 vers eruditschema. 
@todo:
presque tout... ce n'est qu'une première version de test. par ex:
- déclarations namespaces: actuellement il faut enlever toutes les déclaration du html pour que ça marche

- boucle mots clés  dans admin
- Titres niveaux 2 et 3 et suivants avec section (fonctionne pas)
- conserver espaces insécables
- images

-->
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:html="http://www.w3.org/1999/xhtml"
    xmlns:dc="http://purl.org/dc/elements/1.1/">
    <xsl:output method="xml"/>
    <xsl:template match="/">
            
            <article xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.erudit.org/xsd/article"
                xsi:schemaLocation="http://www.erudit.org/xsd/article http://www.erudit.org/xsd/article/3.0.0/eruditarticle.xsd"
                qualtraitement="complet" idproprio="1904ear" typeart="essai" lang="en" ordseq="1">
                <admin>
                    <infoarticle>
                        <idpublic scheme="doi">null</idpublic>
                        <grdescripteur lang="fr" scheme="http://rameau.bnf.fr">
                            <descripteur>meta-descripteur</descripteur>
                          
                        </grdescripteur>
                        <nbpara><xsl:value-of select="count(//p)"/></nbpara>
                        <nbmot> <xsl:value-of select=
                                        " string-length(normalize-space(//body))
                                        -
                                        string-length(translate(normalize-space(//body),' ','')) +1"/></nbmot>
                        <nbfig><xsl:value-of select="count(//figure)"/></nbfig>
                        <nbtabl><xsl:value-of select="count(//table)"/></nbtabl>
                        <nbimage><xsl:value-of select="count(//img)"/></nbimage>
                        <nbaudio><xsl:value-of select="count(//embed)"/></nbaudio>
                        <nbvideo><xsl:value-of select="count(//embed)"/></nbvideo>
                        <nbrefbiblio><xsl:value-of select="count(//div[@class='references']/div)"/></nbrefbiblio>
                        <nbnote><xsl:value-of select="count(//a[@class='footnoteRef'])"/></nbnote>
                    </infoarticle>
                    
                    <revue id="sp01868" lang="fr">
                        
                        <titrerev><xsl:value-of select="//meta[@name='DC.source']/@content"/></titrerev>
                      
                        <titrerevabr>sp</titrerevabr>
                        <idissnnum>2104-3272</idissnnum>
                        <directeur sexe="masculin">
                            <nompers>
                                <prenom>Marcello</prenom>
                                <nomfamille>Vitali-Rosati</nomfamille>
                            </nompers>
                        </directeur>
                    </revue>
                    <numero id="prendre via api">
                        <pub>
                            <annee><xsl:value-of select="//meta[@name='annee']/@content"/></annee>
                        </pub>
                        <pubnum>
                            <date typedate="publication"><xsl:value-of select="//meta[@name='DC.date']/@content"/></date>
                        </pubnum>
                    </numero>
                    <editeur>
                        <nomorg>Département des littératures de langue française</nomorg>
                    </editeur>
                    <prod>
                        <nomorg>Sens public</nomorg>
                    </prod>
                    <prodnum>
                        <nomorg>Sens public</nomorg>
                    </prodnum>
                    <diffnum>
                        <nomorg>Sens public</nomorg>
                    </diffnum>
                   
                    <schema nom="Erudit Article" version="3.0.0" lang="fr"/>
                    <droitsauteur><xsl:value-of select="html/head/meta[@name='DC.rights']/@content"/></droitsauteur>
                </admin>
                <liminaire>
                    <grtitre>
                        <titre><xsl:value-of select="//title"/></titre>
                    </grtitre>
                    <grauteur>
                        <xsl:for-each select="html/head/meta[@name='author']">
                        <auteur id="">
                            
                              
                            <nompers>
                                <prenom><xsl:value-of select="@forname"/></prenom>
                                <nomfamille><xsl:value-of select="@surname"/></nomfamille>
                            </nompers>
                        </auteur>
                        </xsl:for-each>
                    </grauteur>
                    <resume lang="fr">
                        <alinea><xsl:value-of select="html/head/meta[@name='DC.description' and @lang='fr']/@content"/></alinea>
                    </resume>
                    <resume lang="en">
                        <alinea><xsl:value-of select="html/head/meta[@name='DC.description' and @lang='fr']/@content"/></alinea>
                    </resume>
                    <grmotcle lang="fr">
                        <xsl:for-each select="html/head/meta[@name='controlledKeyword']">
                            <motcle><xsl:value-of select="@content"/></motcle>
                        </xsl:for-each>
                        
                    </grmotcle>
                </liminaire>
          
            
            <corps>
               
                <xsl:apply-templates/>
                
             </corps>
        </article>
    </xsl:template>
    
    <xsl:template match="body/p">
        <para>
            <alinea><xsl:apply-templates/></alinea>
        </para>
    </xsl:template>
    <xsl:key name="sectElems" match="/body/*[not(self::h2)]" 
        use="generate-id(preceding-sibling::h2[1])"/>
    
    <xsl:template match="/body">
        <xsl:copy>
            <xsl:copy-of select="@*"/>
            <xsl:apply-templates select="h2"/>
        </xsl:copy>
    </xsl:template>
    
    <xsl:template match="h2">
        <xsl:variable name="id">
            <xsl:value-of select="generate-id()"/>
        </xsl:variable>
        <section1>
            <xsl:copy-of select=".|key('sectElems',$id)"/>
        </section1>
    </xsl:template>
    
  
    <xsl:key name="sectElems" match="/body/*[not(self::h3)]" 
        use="generate-id(preceding-sibling::h3[1])"/>
    <xsl:template match="/body">
        <xsl:copy>
            <xsl:copy-of select="@*"/>
            <xsl:apply-templates select="h3"/>
        </xsl:copy>
    </xsl:template>
    
    <xsl:template match="h3">
        <xsl:variable name="id">
            <xsl:value-of select="generate-id()"/>
        </xsl:variable>
        <section2>
            <xsl:copy-of select=".|key('sectElems',$id)"/>
        </section2>
    </xsl:template>
 
    <xsl:template match="figure">
        <figure>
            <objetmedia flot="bloc">
            <xsl:apply-templates/>
            </objetmedia>
        </figure>
        
    </xsl:template>
    
    <xsl:template match="img">
        <image>
                <xsl:apply-templates/>
            </image>       
    </xsl:template>
 
    <xsl:template match="div[@class='footnotes']">
        <partiesann><grnote>
        <xsl:apply-templates/>
        </grnote>
    </partiesann>
    </xsl:template>
    
    <xsl:template match="div[@class='footnotes']/ol">
       <xsl:for-each select="li">
           <note><no> <xsl:value-of select="position()" /></no><alinea><xsl:apply-templates/></alinea></note>
           </xsl:for-each>
        
    </xsl:template>
 
    <xsl:template match="blockquote">
        <bloccitation>
            <alinea><xsl:apply-templates/></alinea>
        </bloccitation>
    </xsl:template>
    <xsl:template match="a[@class='footnoteRef']">
        <renvoi>
            <xsl:apply-templates/>
        </renvoi>
    </xsl:template>
</xsl:stylesheet>

