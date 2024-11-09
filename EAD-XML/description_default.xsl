<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:strip-space elements="*"/>
    <xsl:output method="html" encoding="ISO-8859-1" doctype-public="-//W3C//DTD HTML 4.0 Transitional//EN"/>
    <xsl:param name="section" select="cover"/>
    <xsl:param name="title" select="Untitled" />
    <xsl:template match="/ead">
        <html>
            <head>
                <style type="text/css">
		            h1, h2, h3, h4 {font-family: helvetica}
		            td {vertical-align: top}
					* {font-family: helvetica}  
                </style>
                <title>
                    <xsl:choose>
                        <xsl:when test="'cover'=$section">
                            <xsl:value-of select="eadheader/filedesc/titlestmt/titleproper"/>
                            <xsl:text>  </xsl:text>
                            <xsl:value-of select="eadheader/filedesc/titlestmt/subtitle"/>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="$title"/>
                        </xsl:otherwise>
                    </xsl:choose>
                </title>
            </head>
            <body>
                <!--
                <center>
                    <img src="yourlogo.gif"/>
                </center>
                -->
                <xsl:if test="'cover'=$section">
                    <xsl:apply-templates select="eadheader/filedesc"/>
                    <hr/>
                    <xsl:apply-templates select="eadheader/profiledesc"/>
                    <xsl:apply-templates select="archdesc/did"/>
                    <xsl:apply-templates select="archdesc/arrangement"/>
                    <xsl:apply-templates select="archdesc/scopecontent"/>
                    <xsl:apply-templates select="archdesc/bioghist"/>
                    <xsl:apply-templates select="archdesc/controlaccess"/>
                    <xsl:call-template name="archdesc-restrict"/>
                    <xsl:call-template name="archdesc-admininfo"/>
                    <xsl:call-template name="archdesc-relatedmaterial"/>
                    <xsl:call-template name="archdesc-separatedmaterial"/>
                </xsl:if>
                
                <!-- start config for displaying collection level desc as multiple pages -->
                <!-- as defined in EAD Specification v.5, page 6-7. Very interesting approach. -->
                <!-- page 1-->
                <xsl:if test="'overview'=$section">
                    <xsl:choose>
                        <xsl:when test="frontmatter">
                            <xsl:apply-templates select="frontmatter"/>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:apply-templates select="eadheader/filedesc"/>
                        </xsl:otherwise>
                    </xsl:choose>
                    <hr/>
                    <xsl:apply-templates select="archdesc/did"/>
                    <xsl:apply-templates select="archdesc/custodhist | archdesc/*/custodhist"/>
                    <xsl:apply-templates select="archdesc/acqinfo     | archdesc/*/acqinfo"/>
                    <xsl:apply-templates select="eaddesc[@level='collection']/processinfo"/>
                    <xsl:apply-templates select="archdesc[@level='collection']/altformavailable"/>
                </xsl:if>

                <!-- page 2 -->
                <xsl:if test="'bioghist'=$section">
                    <xsl:apply-templates select="archdesc/bioghist"/>
                </xsl:if>
                
                <!-- page 3 -->
                <xsl:if test="'scopecontent'=$section">
                    <xsl:apply-templates select="archdesc/scopecontent"/>
                </xsl:if>
                
                <!-- page 4 -->
                <xsl:if test="'arrangement'=$section">
                    <xsl:apply-templates select="archdesc/arrangement"/>
                </xsl:if>
                
                <!-- page 5 -->
                <xsl:if test="'restrict'=$section">
                    <xsl:call-template name="archdesc-restrict"/>
                </xsl:if>
                
                <!-- page 6 -->
                <xsl:if test="'relatedmaterial'=$section">
                    <xsl:call-template name="archdesc-relatedmaterial"/>
                </xsl:if>
                
                <!-- page 7 -->
                <xsl:if test="'separatedmaterial'=$section">
                    <xsl:call-template name="archdesc-separatedmaterial"/>
                </xsl:if>
                
                <!-- page 8 -->
                <xsl:if test="'controlaccess'=$section">
                    <xsl:apply-templates select="archdesc/controlaccess"/>
                </xsl:if>
                
                <!-- page 9 -->
                <xsl:if test="'about'=$section">
                    <xsl:apply-templates select="eadheader/profiledesc"/>
                    <xsl:apply-templates select="archdesc[@level='collection']/descgrp/processinfo"/>
                </xsl:if>
            </body>
        </html>
    </xsl:template>

	<!-- The following general templates format the display of various RENDER attributes.-->
    <xsl:template match="emph[@render='bold']">
        <b>
            <xsl:apply-templates/>
        </b>
    </xsl:template>
    <xsl:template match="emph[@render='italic']">
        <i>
            <xsl:apply-templates/>
        </i>
    </xsl:template>
    <xsl:template match="emph[@render='underline']">
        <u>
            <xsl:apply-templates/>
        </u>
    </xsl:template>
    <xsl:template match="emph[@render='sub']">
        <sub>
            <xsl:apply-templates/>
        </sub>
    </xsl:template>
    <xsl:template match="emph[@render='super']">
        <super>
            <xsl:apply-templates/>
        </super>
    </xsl:template>
    <xsl:template match="emph[@render='quoted']">
        <xsl:text>"</xsl:text>
        <xsl:apply-templates/>
        <xsl:text>"</xsl:text>
    </xsl:template>
    <xsl:template match="emph[@render='doublequote']">
        <xsl:text>"</xsl:text>
        <xsl:apply-templates/>
        <xsl:text>"</xsl:text>
    </xsl:template>
    <xsl:template match="emph[@render='singlequote']">
        <xsl:text>'</xsl:text>
        <xsl:apply-templates/>
        <xsl:text>'</xsl:text>
    </xsl:template>
    <xsl:template match="emph[@render='bolddoublequote']">
        <b>
            <xsl:text>"</xsl:text>
            <xsl:apply-templates/>
            <xsl:text>"</xsl:text>
        </b>
    </xsl:template>
    <xsl:template match="emph[@render='boldsinglequote']">
        <b>
            <xsl:text>'</xsl:text>
            <xsl:apply-templates/>
            <xsl:text>'</xsl:text>
        </b>
    </xsl:template>
    <xsl:template match="emph[@render='boldunderline']">
        <b>
            <u>
                <xsl:apply-templates/>
            </u>
        </b>
    </xsl:template>
    <xsl:template match="emph[@render='bolditalic']">
        <b>
            <i>
                <xsl:apply-templates/>
            </i>
        </b>
    </xsl:template>
    <xsl:template match="emph[@render='boldsmcaps']">
        <font style="font-variant: small-caps">
            <b>
                <xsl:apply-templates/>
            </b>
        </font>
    </xsl:template>
    <xsl:template match="emph[@render='smcaps']">
        <font style="font-variant: small-caps">
            <xsl:apply-templates/>
        </font>
    </xsl:template>
    <xsl:template match="title[@render='bold']">
        <b>
            <xsl:apply-templates/>
        </b>
    </xsl:template>
    <xsl:template match="title[@render='italic']">
        <i>
            <xsl:apply-templates/>
        </i>
    </xsl:template>
    <xsl:template match="title[@render='underline']">
        <u>
            <xsl:apply-templates/>
        </u>
    </xsl:template>
    <xsl:template match="title[@render='sub']">
        <sub>
            <xsl:apply-templates/>
        </sub>
    </xsl:template>
    <xsl:template match="title[@render='super']">
        <super>
            <xsl:apply-templates/>
        </super>
    </xsl:template>
    <xsl:template match="title[@render='quoted']">
        <xsl:text>"</xsl:text>
        <xsl:apply-templates/>
        <xsl:text>"</xsl:text>
    </xsl:template>
    <xsl:template match="title[@render='doublequote']">
        <xsl:text>"</xsl:text>
        <xsl:apply-templates/>
        <xsl:text>"</xsl:text>
    </xsl:template>
    <xsl:template match="title[@render='singlequote']">
        <xsl:text>'</xsl:text>
        <xsl:apply-templates/>
        <xsl:text>'</xsl:text>
    </xsl:template>
    <xsl:template match="title[@render='bolddoublequote']">
        <b>
            <xsl:text>"</xsl:text>
            <xsl:apply-templates/>
            <xsl:text>"</xsl:text>
        </b>
    </xsl:template>
    <xsl:template match="title[@render='boldsinglequote']">
        <b>
            <xsl:text>'</xsl:text>
            <xsl:apply-templates/>
            <xsl:text>'</xsl:text>
        </b>
    </xsl:template>
    <xsl:template match="title[@render='boldunderline']">
        <b>
            <u>
                <xsl:apply-templates/>
            </u>
        </b>
    </xsl:template>
    <xsl:template match="title[@render='bolditalic']">
        <b>
            <i>
                <xsl:apply-templates/>
            </i>
        </b>
    </xsl:template>
    <xsl:template match="title[@render='boldsmcaps']">
        <font style="font-variant: small-caps">
            <b>
                <xsl:apply-templates/>
            </b>
        </font>
    </xsl:template>
    <xsl:template match="title[@render='smcaps']">
        <font style="font-variant: small-caps">
            <xsl:apply-templates/>
        </font>
    </xsl:template>

	<!--This template rule formats a list element anywhere
	except in arrangement.-->
    <!--<xsl:template match="list[parent::*[not(self::arrangement)]]/head">-->
    <xsl:template match="list[parent::*[not(self::arrangement) and not(self::titlepage)]]/head">
        <div style="margin-left: 25pt">
            <b>
                <xsl:apply-templates/>
            </b>
        </div>
    </xsl:template>
    
    <!--<xsl:template match="list[parent::*[not(self::arrangement)]]/item">-->
    <xsl:template match="list[parent::*[not(self::arrangement) and not(self::titlepage)]]/item">
        <div style="margin-left: 40pt">
            <xsl:apply-templates/>
        </div>
    </xsl:template>

	<!--Formats a simple table. The width of each column is defined by the colwidth attribute in a colspec element.-->
    <xsl:template match="table">
        <table width="75%" style="margin-left: 25pt">
            <tr>
                <td colspan="3">
                    <h4>
                        <xsl:apply-templates select="head"/>
                    </h4>
                </td>
            </tr>
            <xsl:for-each select="tgroup">
                <tr>
                    <xsl:for-each select="colspec">
                        <td width="{@colwidth}"/>
                    </xsl:for-each>
                </tr>
                <xsl:for-each select="thead">
                    <xsl:for-each select="row">
                        <tr>
                            <xsl:for-each select="entry">
                                <td valign="top">
                                    <b>
                                        <xsl:apply-templates/>
                                    </b>
                                </td>
                            </xsl:for-each>
                        </tr>
                    </xsl:for-each>
                </xsl:for-each>
                <xsl:for-each select="tbody">
                    <xsl:for-each select="row">
                        <tr>
                            <xsl:for-each select="entry">
                                <td valign="top">
                                    <xsl:apply-templates/>
                                </td>
                            </xsl:for-each>
                        </tr>
                    </xsl:for-each>
                </xsl:for-each>
            </xsl:for-each>
        </table>
    </xsl:template>
	<!--This template rule formats a chronlist element.-->
    <xsl:template match="chronlist">
        <table width="100%" style="margin-left:25pt">
            <tr>
                <td width="5%">
                </td>
                <td width="15%">
                </td>
                <td width="80%">
                </td>
            </tr>
            <xsl:apply-templates/>
        </table>
    </xsl:template>
    <xsl:template match="chronlist/head">
        <tr>
            <td colspan="3">
                <h4>
                    <xsl:apply-templates/>
                </h4>
            </td>
        </tr>
    </xsl:template>
    <xsl:template match="chronlist/listhead">
        <tr>
            <td> </td>
            <td>
                <b>
                    <xsl:apply-templates select="head01"/>
                </b>
            </td>
            <td>
                <b>
                    <xsl:apply-templates select="head02"/>
                </b>
            </td>
        </tr>
    </xsl:template>
    <xsl:template match="chronitem">
		<!--Determine if there are event groups.-->
        <xsl:choose>
            <xsl:when test="eventgrp">
				<!--Put the date and first event on the first line.-->
                <tr>
                    <td> </td>
                    <td valign="top">
                        <xsl:apply-templates select="date"/>
                    </td>
                    <td valign="top">
                        <xsl:apply-templates select="eventgrp/event[position()=1]"/>
                    </td>
                </tr>
				<!--Put each successive event on another line.-->
                <xsl:for-each select="eventgrp/event[not(position()=1)]">
                    <tr>
                        <td> </td>
                        <td> </td>
                        <td valign="top">
                            <xsl:apply-templates select="."/>
                        </td>
                    </tr>
                </xsl:for-each>
            </xsl:when>
			<!--Put the date and event on a single line.-->
            <xsl:otherwise>
                <tr>
                    <td> </td>
                    <td valign="top">
                        <xsl:apply-templates select="date"/>
                    </td>
                    <td valign="top">
                        <xsl:apply-templates select="event"/>
                    </td>
                </tr>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

	<!--Suppreses all other elements of eadheader.-->
	<!--
    <xsl:template match="eadheader">
        <h2 style="text-align:center">
            <a name="{generate-id(titlestmt/titleproper)}">
                <xsl:value-of select="filedesc/titlestmt/titleproper"/>
            </a>
        </h2>
        <h3 style="text-align:center">
            <xsl:value-of select="filedesc/titlestmt/subtitle"/>
        </h3>
        <br/>
    </xsl:template>
    -->
    <xsl:template match="titlepage/list">
        <xsl:apply-templates select="defitem"/>
        <xsl:apply-templates select="head"/>
        <xsl:apply-templates select="label"/>
        <xsl:apply-templates select="item"/>
        <br/>
    </xsl:template>
    <xsl:template match="item | item/list">
        <xsl:apply-templates/>
    </xsl:template>
    <xsl:template match="defitem">
        <xsl:apply-templates select="label"/>
        <br/>
        <xsl:apply-templates select="item"/>
        <br/>
    </xsl:template>
    <xsl:template match="lb">
        <xsl:apply-templates/>
        <BR/>
    </xsl:template>
    <!--<xsl:template match="titlepage/list/item  | titlepage/list/head">-->
    <xsl:template match="titlepage/list/item">
        <xsl:apply-templates/>
        <br/>
    </xsl:template>
    <xsl:template match="titlepage/list/head">
        <b>
            <xsl:apply-templates/>
        </b>
        <br/>
    </xsl:template>
    <xsl:template match="frontmatter">
        <h2 style="text-align:center">
            <a name="{generate-id(titleproper)}">
                <xsl:value-of select="titlepage/titleproper"/>
            </a>
        </h2>
        <div align="center">
            <xsl:if test="titlepage/num">
                <xsl:value-of select="titlepage/num"/>
            </xsl:if>
            <xsl:apply-templates select="titlepage/publisher"/>
            <br/>
            <br/>
            <xsl:apply-templates select="titlepage/list"/>
        </div>
    </xsl:template>
    <xsl:template match="eadheader/filedesc">
        <h2 style="text-align:center">
            <a name="{generate-id(titlestmt/titleproper)}">
                <xsl:value-of select="titlestmt/titleproper"/>
            </a>
        </h2>
		<xsl:if test="titlestmt/subtitle">		
            <h3 style="text-align:center">
                <xsl:value-of select="titlestmt/subtitle"/>
            </h3>
		</xsl:if>
        <xsl:if test="titlestmt/sponsor">
            <h3>Sponsor:</h3>
            <p>
                <xsl:value-of select="titlestmt/sponsor"/>
            </p>
        </xsl:if>
		<!--<h3>Publisher:</h3>-->
        <p style="text-align:center">
            <xsl:value-of select="publicationstmt/publisher"/>
            <br/>
            <xsl:for-each select="publicationstmt/address/addressline">
                <xsl:value-of select="."/>
                <br/>
            </xsl:for-each>
            <br/>
            <xsl:value-of select="publicationstmt/date"/>
        </p>
        <br/>
    </xsl:template>
    <xsl:template match="eadheader/profiledesc">
        <table width="100%">
            <tr>
                <td width="25%">
                </td>
                <td width="75%">
                </td>
            </tr>
            <tr>
                <td>
                    <h3>
						Profile Description
                    </h3>
                </td>
                <td>
                </td>
            </tr>
            <xsl:apply-templates select="creation"/>
            <xsl:apply-templates select="langusage"/>
        </table>
        <hr/>
    </xsl:template>
    <xsl:template match="eadheader/profiledesc/creation  | eadheader/profiledesc/langusage">
		<!--The template tests to see if there is a label attribute,
		inserting the contents if there is or adding display textif there isn't.
		The content of the supplied label depends on the element.  To change the
		supplied label, simply alter the template below.-->
        <xsl:choose>
            <xsl:when test="@label">
                <tr>
                    <td valign="top">
                        <b>
                            <xsl:value-of select="@label"/>
                        </b>
                    </td>
                    <td>
                        <xsl:apply-templates/>
                    </td>
                </tr>
            </xsl:when>
            <xsl:otherwise>
                <tr>
                    <td valign="top">
                        <b>
                            <xsl:choose>
                                <xsl:when test="self::creation">
                                    <xsl:text>Creation: </xsl:text>
                                </xsl:when>
                                <xsl:when test="self::langusage">
                                    <xsl:text>Language: </xsl:text>
                                </xsl:when>
                            </xsl:choose>
                        </b>
                    </td>
                    <td>
                        <xsl:apply-templates/>
                    </td>
                </tr>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>


	<!--This template creates a table for the did, inserts the head and then
each of the other did elements.  To change the order of appearance of these
elements, change the sequence of the apply-templates statements.-->
    <xsl:template match="archdesc/did">
        <table width="100%">
            <tr>
                <td width="25%">
                </td>
                <td width="75%">
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <h3>
                        <xsl:apply-templates select="head"/>
                    </h3>
                </td>
            </tr>

			<!--One can change the order of appearance for the children of did
				by changing the order of the following statements.-->
            <xsl:apply-templates select="repository"/>
            <xsl:apply-templates select="origination"/>
            <xsl:apply-templates select="unittitle"/>
            <xsl:apply-templates select="unitdate"/>
            <xsl:apply-templates select="physdesc"/>
            <xsl:apply-templates select="abstract"/>
            <xsl:apply-templates select="unitid"/>
            <xsl:apply-templates select="physloc"/>
            <xsl:apply-templates select="langmaterial"/>
            <xsl:apply-templates select="materialspec"/>
            <xsl:apply-templates select="note"/>
        </table>
        <hr/>
    </xsl:template>





	<!--This template formats the repostory, origination, physdesc, abstract,
	unitid, physloc and materialspec elements of archdesc/did which share a common presentaiton.
	The sequence of their appearance is governed by the previous template.-->
    <xsl:template match="archdesc/did/repository  | archdesc/did/origination  | archdesc/did/physdesc  | archdesc/did/unitid  | archdesc/did/physloc  | archdesc/did/abstract  | archdesc/did/langmaterial  | archdesc/did/materialspec">
		<!--The template tests to see if there is a label attribute,
		inserting the contents if there is or adding display textif there isn't.
		The content of the supplied label depends on the element.  To change the
		supplied label, simply alter the template below.-->
        <xsl:choose>
            <xsl:when test="@label">
                <tr>
                    <td valign="top">
                        <b>
                            <xsl:value-of select="@label"/>
                        </b>
                    </td>
                    <td>
                        <xsl:apply-templates/>
                    </td>
                </tr>
            </xsl:when>
            <xsl:otherwise>
                <tr>
                    <td valign="top">
                        <b>
                            <xsl:choose>
                                <xsl:when test="self::repository">
                                    <xsl:text>Repository: </xsl:text>
                                </xsl:when>
                                <xsl:when test="self::origination">
                                    <xsl:text>Creator: </xsl:text>
                                </xsl:when>
                                <xsl:when test="self::physdesc">
                                    <xsl:text>Quantity: </xsl:text>
                                </xsl:when>
                                <xsl:when test="self::physloc">
                                    <xsl:text>Location: </xsl:text>
                                </xsl:when>
                                <xsl:when test="self::unitid">
                                    <xsl:text>Identification: </xsl:text>
                                </xsl:when>
                                <xsl:when test="self::abstract">
                                    <xsl:text>Abstract:</xsl:text>
                                </xsl:when>
                                <xsl:when test="self::langmaterial">
                                    <xsl:text>Language: </xsl:text>
                                </xsl:when>
                                <xsl:when test="self::materialspec">
                                    <xsl:text>Technical: </xsl:text>
                                </xsl:when>
                            </xsl:choose>
                        </b>
                    </td>
                    <td>
                        <xsl:apply-templates/>
                    </td>
                </tr>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>


	<!-- The following two templates test for and processes various permutations
of unittitle and unitdate.-->
    <xsl:template match="archdesc/did/unittitle">
		<!--The template tests to see if there is a label attribute for unittitle,
inserting the contents if there is or adding one if there isn't. -->
        <xsl:choose>
            <xsl:when test="@label">
                <tr>
                    <td valign="top">
                        <b>
                            <xsl:value-of select="@label"/>
                        </b>
                    </td>
                    <td>
						<!--Inserts the text of unittitle and any children other that unitdate.-->
                        <xsl:apply-templates select="text() |* [not(self::unitdate)]"/>
                    </td>
                </tr>
            </xsl:when>
            <xsl:otherwise>
                <tr>
                    <td valign="top">
                        <b>
                            <xsl:text>Title: </xsl:text>
                        </b>
                    </td>
                    <td>
                        <xsl:apply-templates select="text() |* [not(self::unitdate)]"/>
                    </td>
                </tr>
            </xsl:otherwise>
        </xsl:choose>
		<!--If unitdate is a child of unittitle, it inserts unitdate on a new line.  -->
        <xsl:if test="child::unitdate">
			<!--The template tests to see if there is a label attribute for unittitle,
			inserting the contents if there is or adding one if there isn't. -->
            <xsl:choose>
                <xsl:when test="unitdate/@label">
                    <tr>
                        <td valign="top">
                            <b>
                                <xsl:value-of select="unitdate/@label"/>
                            </b>
                        </td>
                        <td>
                            <xsl:apply-templates select="unitdate"/>
                        </td>
                    </tr>
                </xsl:when>
                <xsl:otherwise>
                    <tr>
                        <td valign="top">
                            <b>
                                <xsl:text>Dates: </xsl:text>
                            </b>
                        </td>
                        <td>
                            <xsl:apply-templates select="unitdate"/>
                        </td>
                    </tr>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:if>
    </xsl:template>
	<!-- Processes the unit date if it is not a child of unit title but a child of did, the current context.-->
    <xsl:template match="archdesc/did/unitdate">

		<!--The template tests to see if there is a label attribute for a unittitle that is the
	child of did and not unittitle, inserting the contents if there is or adding one if there isn't.-->
        <xsl:choose>
            <xsl:when test="@label">
                <tr>
                    <td valign="top">
                        <b>
                            <xsl:value-of select="@label"/>
                        </b>
                    </td>
                    <td>
                        <xsl:apply-templates/>
                    </td>
                </tr>
            </xsl:when>
            <xsl:otherwise>
                <tr>
                    <td valign="top">
                        <b>
                            <xsl:text>Dates: </xsl:text>
                        </b>
                    </td>
                    <td>
                        <xsl:apply-templates/>
                    </td>
                </tr>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>



	<!--This template processes the note element.-->
    <xsl:template match="archdesc/did/note">
        <xsl:for-each select="p">
			<!--The template tests to see if there is a label attribute,
inserting the contents if there is or adding one if there isn't. -->
            <xsl:choose>
                <xsl:when test="parent::note[@label]">
					<!--This nested choose tests for and processes the first paragraph. Additional paragraphs do not get a label.-->
                    <xsl:choose>
                        <xsl:when test="position()=1">
                            <tr>
                                <td valign="top">
                                    <b>
                                        <xsl:value-of select="@label"/>
                                    </b>
                                </td>
                                <td valign="top">
                                    <xsl:apply-templates/>
                                </td>
                            </tr>
                        </xsl:when>
                        <xsl:otherwise>
                            <tr>
                                <td valign="top"/>
                                <td valign="top">
                                    <xsl:apply-templates/>
                                </td>
                            </tr>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:when>
				<!--Processes situations where there is no
					label attribute by supplying default text.-->
                <xsl:otherwise>
					<!--This nested choose tests for and processes the first paragraph. Additional paragraphs do not get a label.-->
                    <xsl:choose>
                        <xsl:when test="position()=1">
                            <tr>
                                <td valign="top">
                                    <b>
                                        <xsl:text>Note: </xsl:text>
                                    </b>
                                </td>
                                <td>
                                    <xsl:apply-templates/>
                                </td>
                            </tr>
                        </xsl:when>
                        <xsl:otherwise>
                            <tr>
                                <td valign="top"/>
                                <td>
                                    <xsl:apply-templates/>
                                </td>
                            </tr>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:otherwise>
            </xsl:choose>
			<!--Closes each paragraph-->
        </xsl:for-each>
    </xsl:template>

	<!--This template rule formats the top-level bioghist element and
		creates a link back to the top of the page after the display of the element.-->
    <xsl:template match="archdesc/bioghist |    archdesc/scopecontent |    archdesc/phystech |    archdesc/odd   |    archdesc/arrangement">
        <xsl:if test="string(child::*)">
            <xsl:apply-templates/>
            <hr/>
        </xsl:if>
    </xsl:template>

	<!--This template formats various head elements and makes them targets for
		links from the Table of Contents.-->
    <xsl:template match="archdesc/descgrp/head | archdesc/bioghist/head  |    archdesc/scopecontent/head |    archdesc/phystech/head |    archdesc/controlaccess/head |    archdesc/odd/head |    archdesc/arrangement/head">
        <h3>
            <xsl:apply-templates/>
        </h3>
    </xsl:template>
    <xsl:template match="archdesc/bioghist/p |    archdesc/scopecontent/p |    archdesc/phystech/p |    archdesc/controlaccess/p |    archdesc/odd/p |    archdesc/bioghist/note/p |    archdesc/scopecontent/note/p |    archdesc/phystech/note/p |    archdesc/controlaccess/note/p |    archdesc/odd/note/p">
        <p style="margin-left:25pt">
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    <xsl:template match="archdesc/bioghist/bioghist/head |   archdesc/scopecontent/scopecontent/head">
        <h3 style="margin-left:25pt">
            <xsl:apply-templates/>
        </h3>
    </xsl:template>
    <xsl:template match="archdesc/bioghist/bioghist/p |   archdesc/scopecontent/scopecontent/p |   archdesc/bioghist/bioghist/note/p |   archdesc/scopecontent/scopecontent/note/p">
        <p style="margin-left: 50pt">
            <xsl:apply-templates/>
        </p>
    </xsl:template>

	<!-- The next two templates format an arrangement
	statement embedded in <scopecontent>.-->
    <xsl:template match="archdesc/scopecontent/arrangement/head">
        <h4 style="margin-left:25pt">
            <a name="{generate-id()}">
                <xsl:apply-templates/>
            </a>
        </h4>
    </xsl:template>
    <xsl:template match="archdesc/scopecontent/arrangement/p  | archdesc/scopecontent/arrangement/note/p">
        <p style="margin-left:50pt">
            <xsl:apply-templates/>
        </p>
    </xsl:template>

	<!-- The next three templates format a list within an arrangement
	statement whether it is directly within <archdesc> or embedded in
	<scopecontent>.-->
    <xsl:template match="archdesc/scopecontent/arrangement/list/head">
        <div style="margin-left:25pt">
            <a name="{generate-id()}">
                <xsl:apply-templates/>
            </a>
        </div>
    </xsl:template>
    <xsl:template match="archdesc/arrangement/list/head">
        <div style="margin-left:25pt">
            <a name="{generate-id()}">
                <xsl:apply-templates/>
            </a>
        </div>
    </xsl:template>
    <xsl:template match="archdesc/scopecontent/arrangement/list/item  | archdesc/arrangement/list/item">
        <div style="margin-left:50pt">
            <a>
                <xsl:attribute name="href">
					#series
                    <xsl:number/>
                </xsl:attribute>
                <xsl:apply-templates/>
            </a>
        </div>
    </xsl:template>

	<!--This template rule formats the top-level related material
	elements by combining any related or separated materials
	elements. It begins by testing to see if there related or separated
	materials elements with content.-->
    <xsl:template name="archdesc-relatedmaterial">
		<!--<xsl:if test="string(archdesc/relatedmaterial) or   string(archdesc/*/relatedmaterial) or   string(archdesc/separatedmaterial) or   string(archdesc/*/separatedmaterial)">-->
        <xsl:if test="string(archdesc/relatedmaterial) or   string(archdesc/*/relatedmaterial)">
            <h3>
                <b>
                    <xsl:text>Related Material</xsl:text>
                </b>
            </h3>
            <xsl:apply-templates select="archdesc/relatedmaterial/p     | archdesc/*/relatedmaterial/p     | archdesc/relatedmaterial/note/p     | archdesc/*/relatedmaterial/note/p"/>
			<!--<xsl:apply-templates select="archdesc/separatedmaterial/p     | archdesc/*/separatedmaterial/p     | archdesc/separatedmaterial/note/p     | archdesc/*/separatedmaterial/note/p"/>-->
            <hr/>
        </xsl:if>
    </xsl:template>
    <xsl:template name="archdesc-separatedmaterial">
		<!--<xsl:if test="string(archdesc/relatedmaterial) or   string(archdesc/*/relatedmaterial) or   string(archdesc/separatedmaterial) or   string(archdesc/*/separatedmaterial)">-->
        <xsl:if test="string(archdesc/separatedmaterial) or   string(archdesc/*/separatedmaterial)">
            <h3>
                <b>
                    <xsl:text>Separated Material</xsl:text>
                </b>
            </h3>
			<!--<xsl:apply-templates select="archdesc/relatedmaterial/p     | archdesc/*/relatedmaterial/p     | archdesc/relatedmaterial/note/p     | archdesc/*/relatedmaterial/note/p"/>-->
            <xsl:apply-templates select="archdesc/separatedmaterial/p     | archdesc/*/separatedmaterial/p     | archdesc/separatedmaterial/note/p     | archdesc/*/separatedmaterial/note/p"/>
            <hr/>
        </xsl:if>
    </xsl:template>
    <xsl:template match="archdesc/relatedmaterial/p   | archdesc/*/relatedmaterial/p   | archdesc/separatedmaterial/p   | archdesc/*/separatedmaterial/p   | archdesc/relatedmaterial/note/p   | archdesc/*/relatedmaterial/note/p   | archdesc/separatedmaterial/note/p   | archdesc/*/separatedmaterial/note/p">
        <p style="margin-left: 25pt">
            <xsl:apply-templates/>
        </p>
    </xsl:template>

	<!--This template formats the top-level controlaccess element.
	It begins by testing to see if there is any controlled
	access element with content. It then invokes one of two templates
	for the children of controlaccess.  -->
    <xsl:template match="archdesc/controlaccess">
        <xsl:if test="string(child::*)">
            <xsl:apply-templates select="head"/>
            <p style="text-indent:25pt">
                <xsl:apply-templates select="p | note/p"/>
            </p>
            <xsl:choose>
				<!--Apply this template when there are recursive controlaccess
				elements.-->
                <xsl:when test="controlaccess">
                    <xsl:apply-templates mode="recursive" select="."/>
                </xsl:when>
				<!--Apply this template when the controlled terms are entered
				directly under the controlaccess element.-->
                <xsl:otherwise>
                    <xsl:apply-templates mode="direct" select="."/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:if>
    </xsl:template>

	<!--This template formats controlled terms that are entered
	directly under the controlaccess element.  Elements are alphabetized.-->
    <xsl:template mode="direct" match="archdesc/controlaccess">
        <xsl:for-each select="subject |corpname | famname | persname | genreform | geogname | occupation">
            <xsl:sort select="." data-type="text" order="ascending"/>
            <div style="margin-left:50pt">
                <xsl:apply-templates/>
            </div>
        </xsl:for-each>
        <hr> </hr>
    </xsl:template>

	<!--When controlled terms are nested within recursive
	controlaccess elements, the template for controlaccess/controlaccess
	is applied.-->
    <xsl:template mode="recursive" match="archdesc/controlaccess">
        <xsl:apply-templates select="controlaccess"/>
        <hr> </hr>
    </xsl:template>

	<!--This template formats controlled terms that are nested within recursive
	controlaccess elements.   Terms are alphabetized within each grouping.-->
    <xsl:template match="archdesc/controlaccess/controlaccess">
        <xsl:if test="controlacces/controlaccess/head">	
    		<h4 style="margin-left:25pt">
                <xsl:apply-templates select="head"/>
            </h4>
        </xsl:if>
		<xsl:for-each select="subject |corpname | famname | persname | genreform | geogname | occupation">
            <xsl:sort select="." data-type="text" order="ascending"/>
            <div style="margin-left:50pt">
                <xsl:apply-templates/>
            </div>
        </xsl:for-each>
    </xsl:template>

	<!--This template rule formats a top-level access and use retriction elements.
	They are displayed under a common heading.
	It begins by testing to see if there are any restriction elements with content.-->
    <xsl:template name="archdesc-restrict">
        <xsl:if test="string(archdesc/userestrict/*)   or string(archdesc/accessrestrict/*)   or string(archdesc/*/userestrict/*)   or string(archdesc/*/accessrestrict/*)">
            <h3>
                <b>
                    <xsl:text>Restrictions</xsl:text>
                </b>
            </h3>
            <xsl:apply-templates select="archdesc/accessrestrict     | archdesc/*/accessrestrict"/>
            <xsl:apply-templates select="archdesc/userestrict     | archdesc/*/userestrict"/>
            <hr/>
        </xsl:if>
    </xsl:template>
    <xsl:template match="archdesc/accessrestrict/head  | archdesc/userestrict/head  | archdesc/*/accessrestrict/head  | archdesc/*/userestrict/head">
        <h4 style="margin-left: 25pt">
            <xsl:apply-templates/>
        </h4>
    </xsl:template>
    <xsl:template match="archdesc/accessrestrict/p  | archdesc/userestrict/p  | archdesc/*/accessrestrict/p  | archdesc/*/userestrict/p  | archdesc/accessrestrict/note/p  | archdesc/userestrict/note/p  | archdesc/*/accessrestrict/note/p  | archdesc/*/userestrict/note/p">
        <p style="margin-left:50pt">
            <xsl:apply-templates/>
        </p>
    </xsl:template>

	<!--This templates consolidates all the other administrative information
	 elements into one block under a common heading.  It formats these elements
	 regardless of which of three encodings has been utilized.  They may be
	 children of archdesc, admininfo, or descgrp.
	 It begins by testing to see if there are any elements of this type
	 with content.-->
    <xsl:template name="archdesc-admininfo">
        <xsl:if test="string(archdesc/admininfo/custodhist/*)   or string(archdesc/altformavailable/*)   or string(archdesc/prefercite/*)   or string(archdesc/acqinfo/*)   or string(archdesc/processinfo/*)   or string(archdesc/appraisal/*)   or string(archdesc/accruals/*)   or string(archdesc/*/custodhist/*)   or string(archdesc/*/altformavailable/*)   or string(archdesc/*/prefercite/*)   or string(archdesc/*/acqinfo/*)   or string(archdesc/*/processinfo/*)   or string(archdesc/*/appraisal/*)   or string(archdesc/*/accruals/*)">
            <h2>
                <xsl:text>Administrative Information</xsl:text>
            </h2>
            <xsl:apply-templates select="archdesc/custodhist     | archdesc/*/custodhist"/>
            <xsl:apply-templates select="archdesc/altformavailable     | archdesc/*/altformavailable"/>
            <xsl:apply-templates select="archdesc/prefercite     | archdesc/*/prefercite"/>
			<!--
            <xsl:for-each select="archdesc/prefercite     | archdesc/*/prefercite">
                <xsl:apply-templates />
                </xsl:for-each>-->
            <xsl:apply-templates select="archdesc/acqinfo     | archdesc/*/acqinfo"/>
            <xsl:apply-templates select="archdesc/processinfo     | archdesc/*/processinfo"/>
            <xsl:apply-templates select="archdesc/appraisal     | archdesc/*/appraisal"/>
            <xsl:apply-templates select="archdesc/accruals     | archdesc/*/accruals"/>
            <hr/>
        </xsl:if>
    </xsl:template>


	<!--This template rule formats the head element of top-level elements of
	administrative information.-->
    <xsl:template match="custodhist/head   | archdesc/altformavailable/head   | archdesc/prefercite/head   | archdesc/acqinfo/head   | archdesc/processinfo/head   | archdesc/appraisal/head   | archdesc/accruals/head   | archdesc/*/custodhist/head   | archdesc/*/altformavailable/head   | archdesc/*/prefercite/head   | archdesc/*/acqinfo/head   | archdesc/*/processinfo/head   | archdesc/*/appraisal/head   | archdesc/*/accruals/head">
        <h4 style="margin-left:25pt">
            <b>
                <xsl:apply-templates/>
            </b>
        </h4>
    </xsl:template>
    <xsl:template match="custodhist/p   | archdesc/altformavailable/p   | archdesc/prefercite/p   | archdesc/acqinfo/p   | archdesc/processinfo/p   | archdesc/appraisal/p   | archdesc/accruals/p   | archdesc/*/custodhist/p   | archdesc/*/altformavailable/p   | archdesc/*/prefercite/p   | archdesc/*/acqinfo/p   | archdesc/*/processinfo/p   | archdesc/*/appraisal/p   | archdesc/*/accruals/p   | archdesc/custodhist/note/p   | archdesc/altformavailable/note/p   | archdesc/prefercite/note/p   | archdesc/acqinfo/note/p   | archdesc/processinfo/note/p   | archdesc/appraisal/note/p   | archdesc/accruals/note/p   | archdesc/*/custodhist/note/p   | archdesc/*/altformavailable/note/p   | archdesc/*/prefercite/note/p   | archdesc/*/acqinfo/note/p   | archdesc/*/processinfo/note/p   | archdesc/*/appraisal/note/p   | archdesc/*/accruals/note/p">
        <p style="margin-left:50pt">
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    <xsl:template match="archdesc/otherfindaid   | archdesc/*/otherfindaid   | archdesc/bibliography   | archdesc/*/bibliography   | archdesc/phystech   | archdesc/originalsloc">
        <xsl:apply-templates/>
        <hr/>
    </xsl:template>
    <xsl:template match="archdesc/otherfindaid/head   | archdesc/*/otherfindaid/head   | archdesc/bibliography/head   | archdesc/*/bibliography/head   | archdesc/fileplan/head   | archdesc/*/fileplan/head   | archdesc/phystech/head   | archdesc/originalsloc/head">
        <h3>
            <b>
                <xsl:apply-templates/>
            </b>
        </h3>
    </xsl:template>
    <xsl:template match="archdesc/otherfindaid/p   | archdesc/*/otherfindaid/p   | archdesc/bibliography/p   | archdesc/*/bibliography/p   | archdesc/otherfindaid/note/p   | archdesc/*/otherfindaid/note/p   | archdesc/bibliography/note/p   | archdesc/*/bibliography/note/p   | archdesc/fileplan/p   | archdesc/*/fileplan/p   | archdesc/fileplan/note/p   | archdesc/*/fileplan/note/p   | archdesc/phystech/p   | archdesc/phystech/note/p   | archdesc/phystech/p   | archdesc/originalsloc/p   | archdesc/originalsloc/note/p">
        <p style="margin-left:25pt">
            <xsl:apply-templates/>
        </p>
    </xsl:template>

	<!--This template rule tests for and formats the top-level index element. It begins
	by testing to see if there is an index element with content.-->
    <xsl:template match="archdesc/index   | archdesc/*/index">
        <table width="100%">
            <tr>
                <td width="5%">
                </td>
                <td width="45%">
                </td>
                <td width="50%">
                </td>
            </tr>
            <tr>
                <td colspan="3">
                    <h3>
                        <b>
                            <xsl:apply-templates select="head"/>
                        </b>
                    </h3>
                </td>
            </tr>
            <xsl:for-each select="p | note/p">
                <tr>
                    <td/>
                    <td colspan="2">
                        <xsl:apply-templates/>
                    </td>
                </tr>
            </xsl:for-each>

			<!--Processes each index entry.-->
            <xsl:for-each select="indexentry">

				<!--Sorts each entry term.-->
                <xsl:sort select="corpname | famname | function | genreform | geogname | name | occupation | persname | subject"/>
                <tr>
                    <td/>
                    <td>
                        <xsl:apply-templates select="corpname | famname | function | genreform | geogname | name | occupation | persname | subject"/>
                    </td>
					<!--Supplies whitespace and punctuation if there is a pointer
						group with multiple entries.-->
                    <xsl:choose>
                        <xsl:when test="ptrgrp">
                            <td>
                                <xsl:for-each select="ptrgrp">
                                    <xsl:for-each select="ref | ptr">
                                        <xsl:apply-templates/>
                                        <xsl:if test="preceding-sibling::ref or preceding-sibling::ptr">
                                            <xsl:text>, </xsl:text>
                                        </xsl:if>
                                    </xsl:for-each>
                                </xsl:for-each>
                            </td>
                        </xsl:when>
						<!--If there is no pointer group, process each reference or pointer.-->
                        <xsl:otherwise>
                            <td>
                                <xsl:for-each select="ref | ptr">
                                    <xsl:apply-templates/>
                                </xsl:for-each>
                            </td>
                        </xsl:otherwise>
                    </xsl:choose>
                </tr>
				<!--Closes the indexentry.-->
            </xsl:for-each>
        </table>
        <hr/>
    </xsl:template>

	<!--Insert the address for the dsc stylesheet of your choice here.-->
	<xsl:include href="contentslist_default.xsl"/>
</xsl:stylesheet>