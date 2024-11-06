<!-- EAD Cookbook Style 8   Version 0.9   19 January 2004 -->
<!-- Modified for OCLC's ContentDm, 23 October 2008 -->
<!--  This stylesheet generates a document without a Table of Contents
or any hyperlinks.   It is an update to eadcbs4.xsl designed
to work with EAD 2002.-->
<!--This stylesheet does not format the <dsc> portion of a finding aid.   Users
need to select another stylesheet for the dsc and reference that file
in the <xsl:inlcude> statement that appears at the end of this file.-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:strip-space elements="*"/>
    <xsl:output method="html" encoding="ISO-8859-1" doctype-public="-//W3C//DTD HTML 4.0 Transitional//EN"/>
	<!--<xsl:param name="section" select="all"/>-->
	<!-- Creates the body of the finding aid.-->
    <xsl:template match="/ead">
        <html>
            <head>
                <style type="text/css">
					h1, h2, h3, h4 {font-family: arial}
					td {vertical-align: top}
					* {font-family: arial} 
                </style>
                <title>
                    <xsl:value-of select="eadheader/filedesc/titlestmt/titleproper"/>
                    <xsl:text>  </xsl:text>
                    <xsl:value-of select="eadheader/filedesc/titlestmt/subtitle"/>
                </title>
            </head>

			<!--This part of the template creates a table for the finding aid with
	two columns. -->
            <body>

				<!--This part of template inserts a logo and title
				at the top of the display.  Insert the proper path ro
				your image in place of yourlogo.gif.-->

				<!--If you do not want to include an image, delete the center
				 element and its contents.-->
				<!--<center>
					<img src="yourlogo.gif"/>
				</center>
	
				<xsl:apply-templates select="eadheader"/>		
																
				<hr/>
				-->
				<!--<xsl:if test="'all'=$section">-->
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
                <xsl:apply-templates select="archdesc/dsc"/>
				<!--</xsl:if>

				<xsl:if test="'containeronly'=$section">
					<xsl:apply-templates select="archdesc/dsc"/>
				</xsl:if>
				-->
            </body>
        </html>
    </xsl:template>

	<!-- The following general templates format the display of various RENDER
	 attributes.-->
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
    <xsl:template match="list[parent::*[not(self::arrangement)]]/head">
        <div style="margin-left: 25pt">
            <b>
                <xsl:apply-templates/>
            </b>
        </div>
    </xsl:template>
    <xsl:template match="list[parent::*[not(self::arrangement)]]/item">
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
    <xsl:template match="archdesc/bioghist/head  |    archdesc/scopecontent/head |    archdesc/phystech/head |    archdesc/controlaccess/head |    archdesc/odd/head |    archdesc/arrangement/head">
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
        <xsl:for-each select="subject |corpname | famname | persname | genreform | title | geogname | occupation">
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
        <xsl:for-each select="subject |corpname | famname | persname | genreform | title | geogname | occupation">
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
            <h3>
                <xsl:text>Administrative Information</xsl:text>
            </h3>
            <xsl:apply-templates select="archdesc/custodhist     | archdesc/*/custodhist"/>
            <xsl:apply-templates select="archdesc/altformavailable     | archdesc/*/altformavailable"/>
            <xsl:apply-templates select="archdesc/prefercite     | archdesc/*/prefercite"/>
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

	<!--Insert dsc4.xsl-->
	<!--Revision date 21 July 2004-->

	<!-- This stylesheet formats the dsc portion of a finding aid.-->
	<!--It formats components that have 2 container elements of any type.-->
	<!--It assumes that c01 and optionally <c02> is a high-level description
	such as a series, subseries, subgroup or subcollection and does not have container
	elements associated with it. However, it does accommodate situations
	where there a <c01> that is a file is occasionally interspersed. However,
	if <c01> is always a file, use dsc10.xsl instead. -->
	<!--Column headings for containers are displayed when either the value or
	the type of a component's first container differs from that of
	the comparable container in the preceding component. -->
	<!-- The content of column headings are taken from the type
    attribute of the container elements.-->
	<!--The content of any and all container elements is always displayed.-->

	<!-- .................Section 1.................. -->

	<!--This section of the stylesheet formats dsc, its head, and
any introductory paragraphs.-->
    <xsl:template match="archdesc/dsc">
        <xsl:apply-templates/>
    </xsl:template>

	<!--Formats dsc/head and makes it a link target.-->
    <xsl:template match="dsc/head">
        <h3>
            <a name="{generate-id()}">
                <xsl:apply-templates/>
            </a>
        </h3>
    </xsl:template>
    <xsl:template match="dsc/p | dsc/note/p">
        <p style="margin-left:25pt">
            <xsl:apply-templates/>
        </p>
    </xsl:template>

	<!-- ................Section 2 ...........................-->
	<!--This section of the stylesheet contains a named-template
that is used generically throughout the stylesheet.-->

	<!--This template formats the unitid, origination, unittitle,
	unitdate, and physdesc elements of components at all levels.  They appear on
	a separate line from other did elements. It is generic to all
	component levels.-->
    <xsl:template name="component-did">
		<!--Inserts unitid and a space if it exists in the markup.-->
        <xsl:if test="unitid">
            <xsl:apply-templates select="unitid"/>
            <xsl:text> </xsl:text>
        </xsl:if>

		<!--Inserts origination and a space if it exists in the markup.-->
        <xsl:if test="origination">
            <xsl:apply-templates select="origination"/>
            <xsl:text> </xsl:text>
        </xsl:if>

		<!--This choose statement selects between cases where unitdate is a child of
		unittitle and where it is a separate child of did.-->
        <xsl:choose>
			<!--This code processes the elements when unitdate is a child
			of unittitle.-->
            <xsl:when test="unittitle/unitdate">
                <xsl:apply-templates select="unittitle/text()| unittitle/*[not(self::unitdate)]"/>
                <xsl:text> </xsl:text>
                <xsl:for-each select="unittitle/unitdate">
                    <xsl:apply-templates/>
                    <xsl:text> </xsl:text>
                </xsl:for-each>
            </xsl:when>

			<!--This code process the elements when unitdate is not a
					child of untititle-->
            <xsl:otherwise>
                <xsl:apply-templates select="unittitle"/>
                <xsl:text> </xsl:text>
                <xsl:for-each select="unitdate">
                    <xsl:apply-templates/>
                    <xsl:text> </xsl:text>
                </xsl:for-each>
            </xsl:otherwise>
        </xsl:choose>
        <xsl:apply-templates select="physdesc"/>
    </xsl:template>

	<!-- ...............Section 3.............................. -->
	<!--This section of the stylesheet creates an HTML table for each c01.
It then recursively processes each child component of the
c01 by calling a named template specific to that component level.
The named templates are in section 4.-->
    <xsl:template match="c | c01">
        <table width="100%">
            <tr>
                <td width="8%">
                </td>
                <td width="8%">
                </td>
                <td width="8%">
                </td>
                <td width="8%">
                </td>
                <td width="8%">
                </td>
                <td width="8%">
                </td>
                <td width="8%">
                </td>
                <td width="8%">
                </td>
                <td width="8%">
                </td>
                <td width="8%">
                </td>
                <td width="8%">
                </td>
                <td width="12%">
                </td>
            </tr>
			<!--If there should be miscellaneous c01 components that are
			actually file descriptions with associated container data,
			process them in the same way as a c02 is done.   This assumes
			that in these situations there is no c03.-->
            <xsl:choose>
                <xsl:when test="@level='file'">
                    <xsl:call-template name="c02-level-container"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:call-template name="c01-level"/>
                </xsl:otherwise>
            </xsl:choose>


			<!--<xsl:apply-templates select="thead"/>-->
            <xsl:for-each select="c02">
                <xsl:choose>
                    <xsl:when test="@level='subseries' or @level='series'">
                        <xsl:call-template name="c02-level-subseries"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:call-template name="c02-level-container"/>
                    </xsl:otherwise>
                </xsl:choose>
				<!--<xsl:apply-templates select="thead"/>-->
                <xsl:for-each select="c03">
                    <xsl:call-template name="c03-level"/>

					<!--<xsl:apply-templates select="thead"/>-->
                    <xsl:for-each select="c04">
                        <xsl:call-template name="c04-level"/>

						<!--<xsl:apply-templates select="thead"/>-->
                        <xsl:for-each select="c05">
                            <xsl:call-template name="c05-level"/>

							<!--<xsl:apply-templates select="thead"/>-->
                            <xsl:for-each select="c06">
                                <xsl:call-template name="c06-level"/>

								<!--<xsl:apply-templates select="thead"/>-->
                                <xsl:for-each select="c07">
                                    <xsl:call-template name="c07-level"/>

									<!--<xsl:apply-templates select="thead"/>-->
                                    <xsl:for-each select="c08">
                                        <xsl:call-template name="c08-level"/>

										<!--<xsl:apply-templates select="thead"/>-->
                                        <xsl:for-each select="c09">
                                            <xsl:call-template name="c09-level"/>

											<!--<xsl:apply-templates select="thead"/>-->
                                            <xsl:for-each select="c10">
                                                <xsl:call-template name="c10-level"/>

												<!--<xsl:apply-templates select="thead"/>-->
                                            </xsl:for-each>
											<!--Closes c10-->
                                        </xsl:for-each>
										<!--Closes c09-->
                                    </xsl:for-each>
									<!--Closes c08-->
                                </xsl:for-each>
								<!--Closes c07-->
                            </xsl:for-each>
							<!--Closes c06-->
                        </xsl:for-each>
						<!--Closes c05-->
                    </xsl:for-each>
					<!--Closes c04-->
                </xsl:for-each>
				<!--Closes c03-->
            </xsl:for-each>
			<!--Closes c02-->
        </table>
    </xsl:template>

	<!-- ...............Section 4.............................. -->
	<!--This section of the stylesheet contains a separte named template for
each component level.  The contents of each is identical except for the
spacing that is inserted to create the proper column display in HTML
for each level.-->

	<!--Processes c01 which is assumed to be a series
	description without associated components.-->
    <xsl:template name="c01-level">
        <xsl:for-each select="did">
            <tr>
                <td colspan="12">
                    <b>
                        <a>
                            <xsl:attribute name="name">
                                <xsl:text>series</xsl:text>
                                <xsl:number from="dsc" count="c01 "/>
                            </xsl:attribute>
                            <xsl:call-template name="component-did"/>
                        </a>
                    </b>
                </td>
            </tr>
            <xsl:for-each select="abstract | note/p | langmaterial | materialspec">
                <tr>
                    <td> </td>
                    <td> </td>
                    <td colspan="10" valign="top">
                        <xsl:apply-templates/>
                    </td>
                </tr>
            </xsl:for-each>
        </xsl:for-each>
		<!--Closes the did.-->

		<!--This template creates a separate row for each child of
		the listed elements.-->
        <xsl:for-each select="scopecontent | bioghist | arrangement    | userestrict | accessrestrict | processinfo |    acqinfo | custodhist | controlaccess/controlaccess | odd | note    | descgrp/*">
            <xsl:for-each select="head">
                <tr>
                    <td> </td>
                    <td> </td>
                    <td colspan="10">
                        <b>
                            <xsl:apply-templates/>
                        </b>
                    </td>
                </tr>
            </xsl:for-each>
            <xsl:for-each select="*[not(self::head)]">
                <tr>
                    <td> </td>
                    <td> </td>
                    <td colspan="10">
                        <xsl:apply-templates/>
                    </td>
                </tr>
            </xsl:for-each>
        </xsl:for-each>
    </xsl:template>

	<!--This template processes c02 elements that have associated containers, for
	example when c02 is a file.-->
    <xsl:template name="c02-level-container">
        <xsl:for-each select="did">

            <!--The next two variables define the set of container types that
		may appear in the first column of a two column container list.
		Add or subtract container types to fix institutional practice.-->
            <!--
            <xsl:variable name="first" select="container[@type='Box' or @type='Oversize' or @type='Volume' or @type='Carton']"/>
            <xsl:variable name="preceding" select="preceding::did[1]/container[@type='Box' or @type='Oversize' or @type='Volume' or @type='Carton' or @type='Reel']"/>
            -->
            <xsl:variable name="first" select="container[@type='Box' or @type='BOX' or @type='box' or 
                @type='Oversize' or @type='OVERSIZE' or @type='oversize' or 
                @type='Volume' or @type='VOLUME' or @type='volume' or 
                @type='Carton' or @type='CARTON' or @type='carton' or 
                @type='Reel-Frame' or @type='REEL-FRAME' or @type='reel-frame' or 
                @type='Map-Case' or @type='MAP-CASE' or @type='map-case' or 
                @type='Box-Folder' or @type='BOX-FOLDER' or @type='box-folder' or 
                @type='Folio' or @type='FOLIO' or @type='folio' or 
                @type='Othertype' or @type='OTHERTYPE' or @type='othertype']"/>
            <xsl:variable name="preceding" select="preceding::did[1]/container[@type='Box' or @type='BOX' or @type='box' or 
                @type='Oversize' or @type='OVERSIZE' or @type='oversize' or 
                @type='Volume' or @type='VOLUME' or @type='volume' or 
                @type='Carton' or @type='CARTON' or @type='carton' or 
                @type='Reel' or @type='REEL' or @type='reel' or 
                @type='Folder' or @type='FOLDER' or @type='folder' or 
                @type='Frame' or @type='FRAME' or @type='frame' or 
                @type='Page'  or @type='PAGE'  or @type='page'  or 
                @type='Reel-Frame' or @type='REEL-FRAME' or @type='reel-frame' or 
                @type='Map-Case' or @type='MAP-CASE' or @type='map-case' or 
                @type='Box-Folder' or @type='BOX-FOLDER' or @type='box-folder' or 
                @type='Folio' or @type='FOLIO' or @type='folio' or 
                @type='Othertype' or @type='OTHERTYPE' or @type='othertype']"/>
            <!--This variable defines the set of container types that
		may appear in the second column of a two column container list.
		Add or subtract container types to fix institutional practice.-->
            <!--<xsl:variable name="second" select="container[@type='Folder' or @type='Frame' or @type='Page'  or @type='Reel']"/>-->
            <xsl:variable name="second" select="container[
                @type='Reel' or @type='REEL' or @type='reel' or 
                @type='Folder' or @type='FOLDER' or @type='folder' or 
                @type='Frame' or @type='FRAME' or @type='frame' or 
                @type='Page'  or @type='PAGE'  or @type='page'  or 
                @type='Reel-Frame' or @type='REEL-FRAME' or @type='reel-frame' or 
                @type='Map-Case' or @type='MAP-CASE' or @type='map-case' or 
                @type='Box-Folder' or @type='BOX-FOLDER' or @type='box-folder' or 
                @type='Folio' or @type='FOLIO' or @type='folio' or 
                @type='Othertype' or @type='OTHERTYPE' or @type='othertype']"/>
            <xsl:choose>
				<!--When the container value or the container type of the first
			 container is not are the same as that of the comparable container
			in the previous component, insert column heads and the contents of
			the container elements.-->
                <xsl:when test="not($preceding=$first) or    not($preceding/@type=$first/@type)">
                    <tr>
                        <b>
                            <td valign="top">
                                <xsl:value-of select="$first/@type"/>
                            </td>
                            <td valign="top">
                                <xsl:value-of select="$second/@type"/>
                            </td>
                        </b>
                    </tr>
                    <tr>
                        <td valign="top">
                            <xsl:apply-templates select="$first"/>
                        </td>
                        <td valign="top">
                            <xsl:apply-templates select="$second"/>
                        </td>
                        <td valign="top" colspan="10">
                            <xsl:call-template name="component-did"/>
                        </td>
                    </tr>
                </xsl:when>
                <xsl:otherwise>
                    <tr>
                        <td valign="top">
                            <xsl:apply-templates select="$first"/>
                        </td>
                        <td valign="top">
                            <xsl:apply-templates select="$second"/>
                        </td>
                        <td valign="top" colspan="10">
                            <xsl:call-template name="component-did"/>
                        </td>
                    </tr>
                </xsl:otherwise>
            </xsl:choose>
            <xsl:for-each select="abstract | note/p | langmaterial | materialspec">
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td colspan="8" valign="top">
                        <xsl:apply-templates/>
                    </td>
                </tr>
            </xsl:for-each>
        </xsl:for-each>
		<!--Closes the did.-->
        <xsl:for-each select="scopecontent | bioghist | arrangement |    userestrict | accessrestrict | processinfo |    acqinfo | custodhist | controlaccess/controlaccess | odd | note | descgrp/*">
            <xsl:for-each select="head">
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td colspan="8">
                        <b>
                            <xsl:apply-templates/>
                        </b>
                    </td>
                </tr>
            </xsl:for-each>
            <xsl:for-each select="*[not(self::head)]">
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td colspan="8">
                        <xsl:apply-templates/>
                    </td>
                </tr>
            </xsl:for-each>
        </xsl:for-each>
    </xsl:template>

	<!--This template processes c02 level components that do not have
	associated containers, for example if the c02 is a subseries.  The
	various subelements are all indented one column to the right of c01.-->
    <xsl:template name="c02-level-subseries">
        <xsl:for-each select="did">
            <tr>
                <td valign="top"/>
                <td valign="top" colspan="11">
                    <b>
                        <xsl:call-template name="component-did"/>
                    </b>
                </td>
            </tr>
            <xsl:for-each select="abstract | note/p | langmaterial | materialspec">
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td colspan="8" valign="top">
                        <xsl:apply-templates/>
                    </td>
                </tr>
            </xsl:for-each>
        </xsl:for-each>
        <xsl:for-each select="scopecontent | bioghist | arrangement |    descgrp/* | userestrict | accessrestrict | processinfo |    acqinfo | custodhist | controlaccess/controlaccess | odd | note">
            <xsl:for-each select="*">
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td colspan="8">
                        <xsl:apply-templates/>
                    </td>
                </tr>
            </xsl:for-each>
        </xsl:for-each>
    </xsl:template>
    <xsl:template name="c03-level">
        <xsl:for-each select="did">

            <!--The next two variables define the set of container types that
		may appear in the first column of a two column container list.
		Add or subtract container types to fix institutional practice.-->
            <!--
            <xsl:variable name="first" select="container[@type='Box' or @type='Oversize' or @type='Volume' or @type='Carton']"/>
            <xsl:variable name="preceding" select="preceding::did[1]/container[@type='Box' or @type='Oversize' or @type='Volume' or @type='Carton' or @type='Reel']"/>
            -->
            <xsl:variable name="first" select="container[@type='Box' or @type='BOX' or @type='box' or 
                @type='Oversize' or @type='OVERSIZE' or @type='oversize' or 
                @type='Volume' or @type='VOLUME' or @type='volume' or 
                @type='Carton' or @type='CARTON' or @type='carton' or 
                @type='Reel-Frame' or @type='REEL-FRAME' or @type='reel-frame' or 
                @type='Map-Case' or @type='MAP-CASE' or @type='map-case' or 
                @type='Box-Folder' or @type='BOX-FOLDER' or @type='box-folder' or 
                @type='Folio' or @type='FOLIO' or @type='folio' or 
                @type='Othertype' or @type='OTHERTYPE' or @type='othertype']"/>
            <xsl:variable name="preceding" select="preceding::did[1]/container[@type='Box' or @type='BOX' or @type='box' or 
                @type='Oversize' or @type='OVERSIZE' or @type='oversize' or 
                @type='Volume' or @type='VOLUME' or @type='volume' or 
                @type='Carton' or @type='CARTON' or @type='carton' or 
                @type='Reel' or @type='REEL' or @type='reel' or 
                @type='Folder' or @type='FOLDER' or @type='folder' or 
                @type='Frame' or @type='FRAME' or @type='frame' or 
                @type='Page'  or @type='PAGE'  or @type='page'  or 
                @type='Reel-Frame' or @type='REEL-FRAME' or @type='reel-frame' or 
                @type='Map-Case' or @type='MAP-CASE' or @type='map-case' or 
                @type='Box-Folder' or @type='BOX-FOLDER' or @type='box-folder' or 
                @type='Folio' or @type='FOLIO' or @type='folio' or 
                @type='Othertype' or @type='OTHERTYPE' or @type='othertype']"/>
            <!--This variable defines the set of container types that
		may appear in the second column of a two column container list.
		Add or subtract container types to fix institutional practice.-->
            <!--<xsl:variable name="second" select="container[@type='Folder' or @type='Frame' or @type='Page'  or @type='Reel']"/>-->
            <xsl:variable name="second" select="container[
                @type='Reel' or @type='REEL' or @type='reel' or 
                @type='Folder' or @type='FOLDER' or @type='folder' or 
                @type='Frame' or @type='FRAME' or @type='frame' or 
                @type='Page'  or @type='PAGE'  or @type='page'  or 
                @type='Reel-Frame' or @type='REEL-FRAME' or @type='reel-frame' or 
                @type='Map-Case' or @type='MAP-CASE' or @type='map-case' or 
                @type='Box-Folder' or @type='BOX-FOLDER' or @type='box-folder' or 
                @type='Folio' or @type='FOLIO' or @type='folio' or 
                @type='Othertype' or @type='OTHERTYPE' or @type='othertype']"/>
            <xsl:choose>
				<!--When the container value or the container type of the first
			 container is not are the same as that of the comparable container
			in the previous component, insert column heads and the contents of
			the container elements.-->
                <xsl:when test="not($preceding=$first) or    not($preceding/@type=$first/@type)">
                    <tr>
                        <b>
                            <td valign="top">
                                <xsl:value-of select="$first/@type"/>
                            </td>
                            <td valign="top">
                                <xsl:value-of select="$second/@type"/>
                            </td>
                        </b>
                    </tr>
                    <tr>
                        <td valign="top">
                            <xsl:apply-templates select="$first"/>
                        </td>
                        <td valign="top">
                            <xsl:apply-templates select="$second"/>
                        </td>
                        <td> </td>
                        <td valign="top" colspan="9">
                            <xsl:call-template name="component-did"/>
                        </td>
                    </tr>
                </xsl:when>
                <xsl:otherwise>
                    <tr>
                        <td valign="top">
                            <xsl:apply-templates select="$first"/>
                        </td>
                        <td valign="top">
                            <xsl:apply-templates select="$second"/>
                        </td>
                        <td> </td>
                        <td valign="top" colspan="9">
                            <xsl:call-template name="component-did"/>
                        </td>
                    </tr>
                </xsl:otherwise>
            </xsl:choose>
            <xsl:for-each select="abstract | note/p | langmaterial | materialspec">
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td colspan="7" valign="top">
                        <xsl:apply-templates/>
                    </td>
                </tr>
            </xsl:for-each>
        </xsl:for-each>
		<!--Closes the did.-->
        <xsl:for-each select="scopecontent | bioghist | arrangement |    userestrict | accessrestrict | processinfo |    acqinfo | custodhist | controlaccess/controlaccess | odd | note |    descgrp/*">
            <xsl:for-each select="head">
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td colspan="7">
                        <b>
                            <xsl:apply-templates/>
                        </b>
                    </td>
                </tr>
            </xsl:for-each>
            <xsl:for-each select="*[not(self::head)]">
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td colspan="7">
                        <xsl:apply-templates/>
                    </td>
                </tr>
            </xsl:for-each>
        </xsl:for-each>
    </xsl:template>

	<!--This template processes c04 level components.-->
    <xsl:template name="c04-level">
        <xsl:for-each select="did">

            <!--The next two variables define the set of container types that
		may appear in the first column of a two column container list.
		Add or subtract container types to fix institutional practice.-->
            <!--
            <xsl:variable name="first" select="container[@type='Box' or @type='Oversize' or @type='Volume' or @type='Carton']"/>
            <xsl:variable name="preceding" select="preceding::did[1]/container[@type='Box' or @type='Oversize' or @type='Volume' or @type='Carton' or @type='Reel']"/>
            -->
            <xsl:variable name="first" select="container[@type='Box' or @type='BOX' or @type='box' or 
                @type='Oversize' or @type='OVERSIZE' or @type='oversize' or 
                @type='Volume' or @type='VOLUME' or @type='volume' or 
                @type='Carton' or @type='CARTON' or @type='carton' or 
                @type='Reel-Frame' or @type='REEL-FRAME' or @type='reel-frame' or 
                @type='Map-Case' or @type='MAP-CASE' or @type='map-case' or 
                @type='Box-Folder' or @type='BOX-FOLDER' or @type='box-folder' or 
                @type='Folio' or @type='FOLIO' or @type='folio' or 
                @type='Othertype' or @type='OTHERTYPE' or @type='othertype']"/>
            <xsl:variable name="preceding" select="preceding::did[1]/container[@type='Box' or @type='BOX' or @type='box' or 
                @type='Oversize' or @type='OVERSIZE' or @type='oversize' or 
                @type='Volume' or @type='VOLUME' or @type='volume' or 
                @type='Carton' or @type='CARTON' or @type='carton' or 
                @type='Reel' or @type='REEL' or @type='reel' or 
                @type='Folder' or @type='FOLDER' or @type='folder' or 
                @type='Frame' or @type='FRAME' or @type='frame' or 
                @type='Page'  or @type='PAGE'  or @type='page'  or 
                @type='Reel-Frame' or @type='REEL-FRAME' or @type='reel-frame' or 
                @type='Map-Case' or @type='MAP-CASE' or @type='map-case' or 
                @type='Box-Folder' or @type='BOX-FOLDER' or @type='box-folder' or 
                @type='Folio' or @type='FOLIO' or @type='folio' or 
                @type='Othertype' or @type='OTHERTYPE' or @type='othertype']"/>
            <!--This variable defines the set of container types that
		may appear in the second column of a two column container list.
		Add or subtract container types to fix institutional practice.-->
            <!--<xsl:variable name="second" select="container[@type='Folder' or @type='Frame' or @type='Page'  or @type='Reel']"/>-->
            <xsl:variable name="second" select="container[
                @type='Reel' or @type='REEL' or @type='reel' or 
                @type='Folder' or @type='FOLDER' or @type='folder' or 
                @type='Frame' or @type='FRAME' or @type='frame' or 
                @type='Page'  or @type='PAGE'  or @type='page'  or 
                @type='Reel-Frame' or @type='REEL-FRAME' or @type='reel-frame' or 
                @type='Map-Case' or @type='MAP-CASE' or @type='map-case' or 
                @type='Box-Folder' or @type='BOX-FOLDER' or @type='box-folder' or 
                @type='Folio' or @type='FOLIO' or @type='folio' or 
                @type='Othertype' or @type='OTHERTYPE' or @type='othertype']"/>
            <xsl:choose>
				<!--When the container value or the container type of the first
			 container is not are the same as that of the comparable container
			in the previous component, insert column heads and the contents of
			the container elements.-->
                <xsl:when test="not($preceding=$first) or    not($preceding/@type=$first/@type)">
                    <tr>
                        <td valign="top">
                            <xsl:value-of select="$first/@type"/>
                        </td>
                        <td valign="top">
                            <xsl:value-of select="$second/@type"/>
                        </td>
                    </tr>
                    <tr>
                        <td valign="top">
                            <xsl:apply-templates select="$first"/>
                        </td>
                        <td valign="top">
                            <xsl:apply-templates select="$second"/>
                        </td>
                        <td> </td>
                        <td> </td>
                        <td valign="top" colspan="8">
                            <xsl:call-template name="component-did"/>
                        </td>
                    </tr>
                </xsl:when>
                <xsl:otherwise>
                    <tr>
                        <td valign="top">
                            <xsl:apply-templates select="$first"/>
                        </td>
                        <td valign="top">
                            <xsl:apply-templates select="$second"/>
                        </td>
                        <td> </td>
                        <td> </td>
                        <td valign="top" colspan="8">
                            <xsl:call-template name="component-did"/>
                        </td>
                    </tr>
                </xsl:otherwise>
            </xsl:choose>
            <xsl:for-each select="abstract | note/p | langmaterial | materialspec">
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td colspan="6" valign="top">
                        <xsl:apply-templates/>
                    </td>
                </tr>
            </xsl:for-each>
        </xsl:for-each>
		<!--Closes the did-->
        <xsl:for-each select="scopecontent | bioghist | arrangement |    descgrp/* | userestrict | accessrestrict | processinfo |    acqinfo | custodhist | controlaccess/controlaccess | odd | note">
            <xsl:for-each select="head">
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td colspan="6">
                        <b>
                            <xsl:apply-templates/>
                        </b>
                    </td>
                </tr>
            </xsl:for-each>
            <xsl:for-each select="*[not(self::head)]">
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td colspan="6">
                        <xsl:apply-templates/>
                    </td>
                </tr>
            </xsl:for-each>
        </xsl:for-each>
    </xsl:template>
    <xsl:template name="c05-level">
        <xsl:for-each select="did">

            <!--The next two variables define the set of container types that
		may appear in the first column of a two column container list.
		Add or subtract container types to fix institutional practice.-->
            <!--
            <xsl:variable name="first" select="container[@type='Box' or @type='Oversize' or @type='Volume' or @type='Carton']"/>
            <xsl:variable name="preceding" select="preceding::did[1]/container[@type='Box' or @type='Oversize' or @type='Volume' or @type='Carton' or @type='Reel']"/>
            -->
            <xsl:variable name="first" select="container[@type='Box' or @type='BOX' or @type='box' or 
                @type='Oversize' or @type='OVERSIZE' or @type='oversize' or 
                @type='Volume' or @type='VOLUME' or @type='volume' or 
                @type='Carton' or @type='CARTON' or @type='carton' or 
                @type='Reel-Frame' or @type='REEL-FRAME' or @type='reel-frame' or 
                @type='Map-Case' or @type='MAP-CASE' or @type='map-case' or 
                @type='Box-Folder' or @type='BOX-FOLDER' or @type='box-folder' or 
                @type='Folio' or @type='FOLIO' or @type='folio' or 
                @type='Othertype' or @type='OTHERTYPE' or @type='othertype']"/>
            <xsl:variable name="preceding" select="preceding::did[1]/container[@type='Box' or @type='BOX' or @type='box' or 
                @type='Oversize' or @type='OVERSIZE' or @type='oversize' or 
                @type='Volume' or @type='VOLUME' or @type='volume' or 
                @type='Carton' or @type='CARTON' or @type='carton' or 
                @type='Reel' or @type='REEL' or @type='reel' or 
                @type='Folder' or @type='FOLDER' or @type='folder' or 
                @type='Frame' or @type='FRAME' or @type='frame' or 
                @type='Page'  or @type='PAGE'  or @type='page'  or 
                @type='Reel-Frame' or @type='REEL-FRAME' or @type='reel-frame' or 
                @type='Map-Case' or @type='MAP-CASE' or @type='map-case' or 
                @type='Box-Folder' or @type='BOX-FOLDER' or @type='box-folder' or 
                @type='Folio' or @type='FOLIO' or @type='folio' or 
                @type='Othertype' or @type='OTHERTYPE' or @type='othertype']"/>
            <!--This variable defines the set of container types that
		may appear in the second column of a two column container list.
		Add or subtract container types to fix institutional practice.-->
            <!--<xsl:variable name="second" select="container[@type='Folder' or @type='Frame' or @type='Page'  or @type='Reel']"/>-->
            <xsl:variable name="second" select="container[
                @type='Reel' or @type='REEL' or @type='reel' or 
                @type='Folder' or @type='FOLDER' or @type='folder' or 
                @type='Frame' or @type='FRAME' or @type='frame' or 
                @type='Page'  or @type='PAGE'  or @type='page'  or 
                @type='Reel-Frame' or @type='REEL-FRAME' or @type='reel-frame' or 
                @type='Map-Case' or @type='MAP-CASE' or @type='map-case' or 
                @type='Box-Folder' or @type='BOX-FOLDER' or @type='box-folder' or 
                @type='Folio' or @type='FOLIO' or @type='folio' or 
                @type='Othertype' or @type='OTHERTYPE' or @type='othertype']"/>
            <xsl:choose>
				<!--When the container value or the container type of the first
			 container is not are the same as that of the comparable container
			in the previous component, insert column heads and the contents of
			the container elements.-->
                <xsl:when test="not($preceding=$first) or    not($preceding/@type=$first/@type)">
                    <tr>
                        <td valign="top">
                            <xsl:value-of select="$first/@type"/>
                        </td>
                        <td valign="top">
                            <xsl:value-of select="$second/@type"/>
                        </td>
                    </tr>
                    <tr>
                        <td valign="top">
                            <xsl:apply-templates select="$first"/>
                        </td>
                        <td valign="top">
                            <xsl:apply-templates select="$second"/>
                        </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td valign="top" colspan="7">
                            <xsl:call-template name="component-did"/>
                        </td>
                    </tr>
                </xsl:when>
                <xsl:otherwise>
                    <tr>
                        <td valign="top">
                            <xsl:apply-templates select="$first"/>
                        </td>
                        <td valign="top">
                            <xsl:apply-templates select="$second"/>
                        </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td valign="top" colspan="7">
                            <xsl:call-template name="component-did"/>
                        </td>
                    </tr>
                </xsl:otherwise>
            </xsl:choose>
            <xsl:for-each select="abstract | note/p | langmaterial | materialspec">
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td colspan="5" valign="top">
                        <xsl:apply-templates/>
                    </td>
                </tr>
            </xsl:for-each>
        </xsl:for-each>
		<!--Closes the did.-->
        <xsl:for-each select="scopecontent | bioghist | arrangement |    descgrp/* | userestrict | accessrestrict | processinfo |    acqinfo | custodhist | controlaccess/controlaccess | odd | note">
            <xsl:for-each select="head">
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td colspan="5">
                        <b>
                            <xsl:apply-templates/>
                        </b>
                    </td>
                </tr>
            </xsl:for-each>
            <xsl:for-each select="*[not(self::head)]">
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td colspan="5">
                        <xsl:apply-templates/>
                    </td>
                </tr>
            </xsl:for-each>
        </xsl:for-each>
    </xsl:template>

	<!--This template processes c06 components.-->
    <xsl:template name="c06-level">
        <xsl:for-each select="did">
            <!--The next two variables define the set of container types that
		may appear in the first column of a two column container list.
		Add or subtract container types to fix institutional practice.-->
            <!--
            <xsl:variable name="first" select="container[@type='Box' or @type='Oversize' or @type='Volume' or @type='Carton']"/>
            <xsl:variable name="preceding" select="preceding::did[1]/container[@type='Box' or @type='Oversize' or @type='Volume' or @type='Carton' or @type='Reel']"/>
            -->
            <xsl:variable name="first" select="container[@type='Box' or @type='BOX' or @type='box' or 
                @type='Oversize' or @type='OVERSIZE' or @type='oversize' or 
                @type='Volume' or @type='VOLUME' or @type='volume' or 
                @type='Carton' or @type='CARTON' or @type='carton' or 
                @type='Reel-Frame' or @type='REEL-FRAME' or @type='reel-frame' or 
                @type='Map-Case' or @type='MAP-CASE' or @type='map-case' or 
                @type='Box-Folder' or @type='BOX-FOLDER' or @type='box-folder' or 
                @type='Folio' or @type='FOLIO' or @type='folio' or 
                @type='Othertype' or @type='OTHERTYPE' or @type='othertype']"/>
            <xsl:variable name="preceding" select="preceding::did[1]/container[@type='Box' or @type='BOX' or @type='box' or 
                @type='Oversize' or @type='OVERSIZE' or @type='oversize' or 
                @type='Volume' or @type='VOLUME' or @type='volume' or 
                @type='Carton' or @type='CARTON' or @type='carton' or 
                @type='Reel' or @type='REEL' or @type='reel' or 
                @type='Folder' or @type='FOLDER' or @type='folder' or 
                @type='Frame' or @type='FRAME' or @type='frame' or 
                @type='Page'  or @type='PAGE'  or @type='page'  or 
                @type='Reel-Frame' or @type='REEL-FRAME' or @type='reel-frame' or 
                @type='Map-Case' or @type='MAP-CASE' or @type='map-case' or 
                @type='Box-Folder' or @type='BOX-FOLDER' or @type='box-folder' or 
                @type='Folio' or @type='FOLIO' or @type='folio' or 
                @type='Othertype' or @type='OTHERTYPE' or @type='othertype']"/>
            <!--This variable defines the set of container types that
		may appear in the second column of a two column container list.
		Add or subtract container types to fix institutional practice.-->
            <!--<xsl:variable name="second" select="container[@type='Folder' or @type='Frame' or @type='Page'  or @type='Reel']"/>-->
            <xsl:variable name="second" select="container[
                @type='Reel' or @type='REEL' or @type='reel' or 
                @type='Folder' or @type='FOLDER' or @type='folder' or 
                @type='Frame' or @type='FRAME' or @type='frame' or 
                @type='Page'  or @type='PAGE'  or @type='page'  or 
                @type='Reel-Frame' or @type='REEL-FRAME' or @type='reel-frame' or 
                @type='Map-Case' or @type='MAP-CASE' or @type='map-case' or 
                @type='Box-Folder' or @type='BOX-FOLDER' or @type='box-folder' or 
                @type='Folio' or @type='FOLIO' or @type='folio' or 
                @type='Othertype' or @type='OTHERTYPE' or @type='othertype']"/>
            <xsl:choose>
				<!--When the container value or the container type of the first
			 container is not are the same as that of the comparable container
			in the previous component, insert column heads and the contents of
			the container elements.-->
                <xsl:when test="not($preceding=$first) or    not($preceding/@type=$first/@type)">
                    <tr>
                        <td valign="top">
                            <xsl:value-of select="$first/@type"/>
                        </td>
                        <td valign="top">
                            <xsl:value-of select="$second/@type"/>
                        </td>
                    </tr>
                    <tr>
                        <td valign="top">
                            <xsl:apply-templates select="$first"/>
                        </td>
                        <td valign="top">
                            <xsl:apply-templates select="$second"/>
                        </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td valign="top" colspan="6">
                            <xsl:call-template name="component-did"/>
                        </td>
                    </tr>
                </xsl:when>
                <xsl:otherwise>
                    <tr>
                        <td valign="top">
                            <xsl:apply-templates select="$first"/>
                        </td>
                        <td valign="top">
                            <xsl:apply-templates select="$second"/>
                        </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td valign="top" colspan="6">
                            <xsl:call-template name="component-did"/>
                        </td>
                    </tr>
                </xsl:otherwise>
            </xsl:choose>
            <xsl:for-each select="abstract | note/p | langmaterial | materialspec">
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td colspan="4" valign="top">
                        <xsl:apply-templates/>
                    </td>
                </tr>
            </xsl:for-each>
        </xsl:for-each>
		<!--Closes the did.-->
        <xsl:for-each select="scopecontent | bioghist | arrangement |    userestrict | accessrestrict | processinfo |    acqinfo | custodhist | controlaccess/controlaccess | odd | note |    descgrp/*">
            <xsl:for-each select="head">
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td colspan="4">
                        <b>
                            <xsl:apply-templates/>
                        </b>
                    </td>
                </tr>
            </xsl:for-each>
            <xsl:for-each select="*[not(self::head)]">
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td colspan="4">
                        <xsl:apply-templates/>
                    </td>
                </tr>
            </xsl:for-each>
        </xsl:for-each>
    </xsl:template>
    <xsl:template name="c07-level">
        <xsl:for-each select="did">
            <!--The next two variables define the set of container types that
		may appear in the first column of a two column container list.
		Add or subtract container types to fix institutional practice.-->
            <!--
            <xsl:variable name="first" select="container[@type='Box' or @type='Oversize' or @type='Volume' or @type='Carton']"/>
            <xsl:variable name="preceding" select="preceding::did[1]/container[@type='Box' or @type='Oversize' or @type='Volume' or @type='Carton' or @type='Reel']"/>
            -->
            <xsl:variable name="first" select="container[@type='Box' or @type='BOX' or @type='box' or 
                @type='Oversize' or @type='OVERSIZE' or @type='oversize' or 
                @type='Volume' or @type='VOLUME' or @type='volume' or 
                @type='Carton' or @type='CARTON' or @type='carton' or 
                @type='Reel-Frame' or @type='REEL-FRAME' or @type='reel-frame' or 
                @type='Map-Case' or @type='MAP-CASE' or @type='map-case' or 
                @type='Box-Folder' or @type='BOX-FOLDER' or @type='box-folder' or 
                @type='Folio' or @type='FOLIO' or @type='folio' or 
                @type='Othertype' or @type='OTHERTYPE' or @type='othertype']"/>
            <xsl:variable name="preceding" select="preceding::did[1]/container[@type='Box' or @type='BOX' or @type='box' or 
                @type='Oversize' or @type='OVERSIZE' or @type='oversize' or 
                @type='Volume' or @type='VOLUME' or @type='volume' or 
                @type='Carton' or @type='CARTON' or @type='carton' or 
                @type='Reel' or @type='REEL' or @type='reel' or 
                @type='Folder' or @type='FOLDER' or @type='folder' or 
                @type='Frame' or @type='FRAME' or @type='frame' or 
                @type='Page'  or @type='PAGE'  or @type='page'  or 
                @type='Reel-Frame' or @type='REEL-FRAME' or @type='reel-frame' or 
                @type='Map-Case' or @type='MAP-CASE' or @type='map-case' or 
                @type='Box-Folder' or @type='BOX-FOLDER' or @type='box-folder' or 
                @type='Folio' or @type='FOLIO' or @type='folio' or 
                @type='Othertype' or @type='OTHERTYPE' or @type='othertype']"/>
            <!--This variable defines the set of container types that
		may appear in the second column of a two column container list.
		Add or subtract container types to fix institutional practice.-->
            <!--<xsl:variable name="second" select="container[@type='Folder' or @type='Frame' or @type='Page'  or @type='Reel']"/>-->
            <xsl:variable name="second" select="container[
                @type='Reel' or @type='REEL' or @type='reel' or 
                @type='Folder' or @type='FOLDER' or @type='folder' or 
                @type='Frame' or @type='FRAME' or @type='frame' or 
                @type='Page'  or @type='PAGE'  or @type='page'  or 
                @type='Reel-Frame' or @type='REEL-FRAME' or @type='reel-frame' or 
                @type='Map-Case' or @type='MAP-CASE' or @type='map-case' or 
                @type='Box-Folder' or @type='BOX-FOLDER' or @type='box-folder' or 
                @type='Folio' or @type='FOLIO' or @type='folio' or 
                @type='Othertype' or @type='OTHERTYPE' or @type='othertype']"/>
            <xsl:choose>
				<!--When the container value or the container type of the first
			 container is not are the same as that of the comparable container
			in the previous component, insert column heads and the contents of
			the container elements.-->
                <xsl:when test="not($preceding=$first) or    not($preceding/@type=$first/@type)">
                    <tr>
                        <td valign="top">
                            <xsl:value-of select="$first/@type"/>
                        </td>
                        <td valign="top">
                            <xsl:value-of select="$second/@type"/>
                        </td>
                    </tr>
                    <tr>
                        <td valign="top">
                            <xsl:apply-templates select="$first"/>
                        </td>
                        <td valign="top">
                            <xsl:apply-templates select="$second"/>
                        </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td valign="top" colspan="5">
                            <xsl:call-template name="component-did"/>
                        </td>
                    </tr>
                </xsl:when>
                <xsl:otherwise>
                    <tr>
                        <td valign="top">
                            <xsl:apply-templates select="$first"/>
                        </td>
                        <td valign="top">
                            <xsl:apply-templates select="$second"/>
                        </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td valign="top" colspan="5">
                            <xsl:call-template name="component-did"/>
                        </td>
                    </tr>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:for-each>
		<!--Closes the did.-->
        <xsl:for-each select="abstract | note/p | langmaterial | materialspec">
            <tr>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td colspan="3" valign="top">
                    <xsl:apply-templates/>
                </td>
            </tr>
        </xsl:for-each>
        <xsl:for-each select="scopecontent | bioghist | arrangement |    descgrp/* | userestrict | accessrestrict | processinfo |    acqinfo | custodhist | controlaccess/controlaccess | odd | note">
            <xsl:for-each select="head">
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td colspan="3">
                        <b>
                            <xsl:apply-templates/>
                        </b>
                    </td>
                </tr>
            </xsl:for-each>
            <xsl:for-each select="*[not(self::head)]">
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td colspan="3">
                        <xsl:apply-templates/>
                    </td>
                </tr>
            </xsl:for-each>
        </xsl:for-each>
    </xsl:template>
    <xsl:template name="c08-level">
        <xsl:for-each select="did">
            <!--The next two variables define the set of container types that
		may appear in the first column of a two column container list.
		Add or subtract container types to fix institutional practice.-->
            <!--
            <xsl:variable name="first" select="container[@type='Box' or @type='Oversize' or @type='Volume' or @type='Carton']"/>
            <xsl:variable name="preceding" select="preceding::did[1]/container[@type='Box' or @type='Oversize' or @type='Volume' or @type='Carton' or @type='Reel']"/>
            -->
            <xsl:variable name="first" select="container[@type='Box' or @type='BOX' or @type='box' or 
                @type='Oversize' or @type='OVERSIZE' or @type='oversize' or 
                @type='Volume' or @type='VOLUME' or @type='volume' or 
                @type='Carton' or @type='CARTON' or @type='carton' or 
                @type='Reel-Frame' or @type='REEL-FRAME' or @type='reel-frame' or 
                @type='Map-Case' or @type='MAP-CASE' or @type='map-case' or 
                @type='Box-Folder' or @type='BOX-FOLDER' or @type='box-folder' or 
                @type='Folio' or @type='FOLIO' or @type='folio' or 
                @type='Othertype' or @type='OTHERTYPE' or @type='othertype']"/>
            <xsl:variable name="preceding" select="preceding::did[1]/container[@type='Box' or @type='BOX' or @type='box' or 
                @type='Oversize' or @type='OVERSIZE' or @type='oversize' or 
                @type='Volume' or @type='VOLUME' or @type='volume' or 
                @type='Carton' or @type='CARTON' or @type='carton' or 
                @type='Reel' or @type='REEL' or @type='reel' or 
                @type='Folder' or @type='FOLDER' or @type='folder' or 
                @type='Frame' or @type='FRAME' or @type='frame' or 
                @type='Page'  or @type='PAGE'  or @type='page'  or 
                @type='Reel-Frame' or @type='REEL-FRAME' or @type='reel-frame' or 
                @type='Map-Case' or @type='MAP-CASE' or @type='map-case' or 
                @type='Box-Folder' or @type='BOX-FOLDER' or @type='box-folder' or 
                @type='Folio' or @type='FOLIO' or @type='folio' or 
                @type='Othertype' or @type='OTHERTYPE' or @type='othertype']"/>
            <!--This variable defines the set of container types that
		may appear in the second column of a two column container list.
		Add or subtract container types to fix institutional practice.-->
            <!--<xsl:variable name="second" select="container[@type='Folder' or @type='Frame' or @type='Page'  or @type='Reel']"/>-->
            <xsl:variable name="second" select="container[
                @type='Reel' or @type='REEL' or @type='reel' or 
                @type='Folder' or @type='FOLDER' or @type='folder' or 
                @type='Frame' or @type='FRAME' or @type='frame' or 
                @type='Page'  or @type='PAGE'  or @type='page'  or 
                @type='Reel-Frame' or @type='REEL-FRAME' or @type='reel-frame' or 
                @type='Map-Case' or @type='MAP-CASE' or @type='map-case' or 
                @type='Box-Folder' or @type='BOX-FOLDER' or @type='box-folder' or 
                @type='Folio' or @type='FOLIO' or @type='folio' or 
                @type='Othertype' or @type='OTHERTYPE' or @type='othertype']"/>
            <xsl:choose>
				<!--When the container value or the container type of the first
			 container is not are the same as that of the comparable container
			in the previous component, insert column heads and the contents of
			the container elements.-->
                <xsl:when test="not($preceding=$first) or    not($preceding/@type=$first/@type)">
                    <tr>
                        <td valign="top">
                            <xsl:value-of select="$first/@type"/>
                        </td>
                        <td valign="top">
                            <xsl:value-of select="$second/@type"/>
                        </td>
                    </tr>
                    <tr>
                        <td valign="top">
                            <xsl:apply-templates select="$first"/>
                        </td>
                        <td valign="top">
                            <xsl:apply-templates select="$second"/>
                        </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td valign="top" colspan="4">
                            <xsl:call-template name="component-did"/>
                        </td>
                    </tr>
                </xsl:when>
                <xsl:otherwise>
                    <tr>
                        <td valign="top">
                            <xsl:apply-templates select="$first"/>
                        </td>
                        <td valign="top">
                            <xsl:apply-templates select="$second"/>
                        </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td valign="top" colspan="4">
                            <xsl:call-template name="component-did"/>
                        </td>
                    </tr>
                </xsl:otherwise>
            </xsl:choose>
            <xsl:for-each select="abstract | note/p | langmaterial | materialspec">
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td colspan="2" valign="top">
                        <xsl:apply-templates/>
                    </td>
                </tr>
            </xsl:for-each>
        </xsl:for-each>
		<!--Closes the did.-->
        <xsl:for-each select="scopecontent | bioghist | arrangement |    descgrp/* | userestrict | accessrestrict | processinfo |    acqinfo | custodhist | controlaccess/controlaccess | odd | note">
            <xsl:for-each select="head">
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td colspan="2">
                        <b>
                            <xsl:apply-templates/>
                        </b>
                    </td>
                </tr>
            </xsl:for-each>
            <xsl:for-each select="*[not(self::head)]">
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td colspan="2">
                        <xsl:apply-templates/>
                    </td>
                </tr>
            </xsl:for-each>
        </xsl:for-each>
    </xsl:template>
    <xsl:template name="c09-level">
        <xsl:for-each select="did">

            <!--The next two variables define the set of container types that
		may appear in the first column of a two column container list.
		Add or subtract container types to fix institutional practice.-->
            <!--
            <xsl:variable name="first" select="container[@type='Box' or @type='Oversize' or @type='Volume' or @type='Carton']"/>
            <xsl:variable name="preceding" select="preceding::did[1]/container[@type='Box' or @type='Oversize' or @type='Volume' or @type='Carton' or @type='Reel']"/>
            -->
            <xsl:variable name="first" select="container[@type='Box' or @type='BOX' or @type='box' or 
                @type='Oversize' or @type='OVERSIZE' or @type='oversize' or 
                @type='Volume' or @type='VOLUME' or @type='volume' or 
                @type='Carton' or @type='CARTON' or @type='carton' or 
                @type='Reel-Frame' or @type='REEL-FRAME' or @type='reel-frame' or 
                @type='Map-Case' or @type='MAP-CASE' or @type='map-case' or 
                @type='Box-Folder' or @type='BOX-FOLDER' or @type='box-folder' or 
                @type='Folio' or @type='FOLIO' or @type='folio' or 
                @type='Othertype' or @type='OTHERTYPE' or @type='othertype']"/>
            <xsl:variable name="preceding" select="preceding::did[1]/container[@type='Box' or @type='BOX' or @type='box' or 
                @type='Oversize' or @type='OVERSIZE' or @type='oversize' or 
                @type='Volume' or @type='VOLUME' or @type='volume' or 
                @type='Carton' or @type='CARTON' or @type='carton' or 
                @type='Reel' or @type='REEL' or @type='reel' or 
                @type='Folder' or @type='FOLDER' or @type='folder' or 
                @type='Frame' or @type='FRAME' or @type='frame' or 
                @type='Page'  or @type='PAGE'  or @type='page'  or 
                @type='Reel-Frame' or @type='REEL-FRAME' or @type='reel-frame' or 
                @type='Map-Case' or @type='MAP-CASE' or @type='map-case' or 
                @type='Box-Folder' or @type='BOX-FOLDER' or @type='box-folder' or 
                @type='Folio' or @type='FOLIO' or @type='folio' or 
                @type='Othertype' or @type='OTHERTYPE' or @type='othertype']"/>
            <!--This variable defines the set of container types that
		may appear in the second column of a two column container list.
		Add or subtract container types to fix institutional practice.-->
            <!--<xsl:variable name="second" select="container[@type='Folder' or @type='Frame' or @type='Page'  or @type='Reel']"/>-->
            <xsl:variable name="second" select="container[
                @type='Reel' or @type='REEL' or @type='reel' or 
                @type='Folder' or @type='FOLDER' or @type='folder' or 
                @type='Frame' or @type='FRAME' or @type='frame' or 
                @type='Page'  or @type='PAGE'  or @type='page'  or 
                @type='Reel-Frame' or @type='REEL-FRAME' or @type='reel-frame' or 
                @type='Map-Case' or @type='MAP-CASE' or @type='map-case' or 
                @type='Box-Folder' or @type='BOX-FOLDER' or @type='box-folder' or 
                @type='Folio' or @type='FOLIO' or @type='folio' or 
                @type='Othertype' or @type='OTHERTYPE' or @type='othertype']"/>
            <xsl:choose>
				<!--When the container value or the container type of the first
			 container is not are the same as that of the comparable container
			in the previous component, insert column heads and the contents of
			the container elements.-->
                <xsl:when test="not($preceding=$first) or    not($preceding/@type=$first/@type)">
                    <tr>
                        <td valign="top">
                            <xsl:value-of select="$first/@type"/>
                        </td>
                        <td valign="top">
                            <xsl:value-of select="$second/@type"/>
                        </td>
                    </tr>
                    <tr>
                        <td valign="top">
                            <xsl:apply-templates select="$first"/>
                        </td>
                        <td valign="top">
                            <xsl:apply-templates select="$second"/>
                        </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td valign="top" colspan="3">
                            <xsl:call-template name="component-did"/>
                        </td>
                    </tr>
                </xsl:when>
                <xsl:otherwise>
                    <tr>
                        <td valign="top">
                            <xsl:apply-templates select="$first"/>
                        </td>
                        <td valign="top">
                            <xsl:apply-templates select="$second"/>
                        </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td valign="top" colspan="3">
                            <xsl:call-template name="component-did"/>
                        </td>
                    </tr>
                </xsl:otherwise>
            </xsl:choose>
            <xsl:for-each select="abstract | note/p | langmaterial | materialspec">
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td colspan="1" valign="top">
                        <xsl:apply-templates/>
                    </td>
                </tr>
            </xsl:for-each>
        </xsl:for-each>
		<!--Closes the did.-->
        <xsl:for-each select="scopecontent | bioghist | arrangement |    descgrp/* | userestrict | accessrestrict | processinfo |    acqinfo | custodhist | controlaccess/controlaccess | odd | note">
            <xsl:for-each select="head">
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td colspan="1" valign="top">
                        <b>
                            <xsl:apply-templates/>
                        </b>
                    </td>
                </tr>
            </xsl:for-each>
            <xsl:for-each select="*[not(self::head)]">
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td colspan="1" valign="top">
                        <xsl:apply-templates/>
                    </td>
                </tr>
            </xsl:for-each>
        </xsl:for-each>
    </xsl:template>
    <xsl:template name="c10-level">
        <xsl:for-each select="did">

            <!--The next two variables define the set of container types that
		may appear in the first column of a two column container list.
		Add or subtract container types to fix institutional practice.-->
            <!--
            <xsl:variable name="first" select="container[@type='Box' or @type='Oversize' or @type='Volume' or @type='Carton']"/>
            <xsl:variable name="preceding" select="preceding::did[1]/container[@type='Box' or @type='Oversize' or @type='Volume' or @type='Carton' or @type='Reel']"/>
            -->
            <xsl:variable name="first" select="container[@type='Box' or @type='BOX' or @type='box' or 
                @type='Oversize' or @type='OVERSIZE' or @type='oversize' or 
                @type='Volume' or @type='VOLUME' or @type='volume' or 
                @type='Carton' or @type='CARTON' or @type='carton' or 
                @type='Reel-Frame' or @type='REEL-FRAME' or @type='reel-frame' or 
                @type='Map-Case' or @type='MAP-CASE' or @type='map-case' or 
                @type='Box-Folder' or @type='BOX-FOLDER' or @type='box-folder' or 
                @type='Folio' or @type='FOLIO' or @type='folio' or 
                @type='Othertype' or @type='OTHERTYPE' or @type='othertype']"/>
            <xsl:variable name="preceding" select="preceding::did[1]/container[@type='Box' or @type='BOX' or @type='box' or 
                @type='Oversize' or @type='OVERSIZE' or @type='oversize' or 
                @type='Volume' or @type='VOLUME' or @type='volume' or 
                @type='Carton' or @type='CARTON' or @type='carton' or 
                @type='Reel' or @type='REEL' or @type='reel' or 
                @type='Folder' or @type='FOLDER' or @type='folder' or 
                @type='Frame' or @type='FRAME' or @type='frame' or 
                @type='Page'  or @type='PAGE'  or @type='page'  or 
                @type='Reel-Frame' or @type='REEL-FRAME' or @type='reel-frame' or 
                @type='Map-Case' or @type='MAP-CASE' or @type='map-case' or 
                @type='Box-Folder' or @type='BOX-FOLDER' or @type='box-folder' or 
                @type='Folio' or @type='FOLIO' or @type='folio' or 
                @type='Othertype' or @type='OTHERTYPE' or @type='othertype']"/>
            <!--This variable defines the set of container types that
		may appear in the second column of a two column container list.
		Add or subtract container types to fix institutional practice.-->
            <!--<xsl:variable name="second" select="container[@type='Folder' or @type='Frame' or @type='Page'  or @type='Reel']"/>-->
            <xsl:variable name="second" select="container[
                @type='Reel' or @type='REEL' or @type='reel' or 
                @type='Folder' or @type='FOLDER' or @type='folder' or 
                @type='Frame' or @type='FRAME' or @type='frame' or 
                @type='Page'  or @type='PAGE'  or @type='page'  or 
                @type='Reel-Frame' or @type='REEL-FRAME' or @type='reel-frame' or 
                @type='Map-Case' or @type='MAP-CASE' or @type='map-case' or 
                @type='Box-Folder' or @type='BOX-FOLDER' or @type='box-folder' or 
                @type='Folio' or @type='FOLIO' or @type='folio' or 
                @type='Othertype' or @type='OTHERTYPE' or @type='othertype']"/>
            <xsl:choose>
				<!--When the container value or the container type of the first
			 container is not are the same as that of the comparable container
			in the previous component, insert column heads and the contents of
			the container elements.-->
                <xsl:when test="not($preceding=$first) or    not($preceding/@type=$first/@type)">
                    <tr>
                        <td valign="top">
                            <xsl:value-of select="$first/@type"/>
                        </td>
                        <td valign="top">
                            <xsl:value-of select="$second/@type"/>
                        </td>
                    </tr>
                    <tr>
                        <td valign="top">
                            <xsl:apply-templates select="$first"/>
                        </td>
                        <td valign="top">
                            <xsl:apply-templates select="$second"/>
                        </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td valign="top" colspan="2">
                            <xsl:call-template name="component-did"/>
                        </td>
                    </tr>
                </xsl:when>
                <xsl:otherwise>
                    <tr>
                        <td valign="top">
                            <xsl:apply-templates select="$second"/>
                        </td>
                        <td valign="top">
                            <xsl:apply-templates select="$second"/>
                        </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td valign="top" colspan="2">
                            <xsl:call-template name="component-did"/>
                        </td>
                    </tr>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:for-each>
		<!--Closes the did.-->
    </xsl:template>
</xsl:stylesheet>