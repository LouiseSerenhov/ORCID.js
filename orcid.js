/**
 * Created by michaelcrabb on 05/03/2017.
 */


//Hämtar alla arbeten + lite översiktlig data 
function createORCIDProfile(orcidID) {
  var ORCIDLink = "https://pub.orcid.org/v2.0/" + orcidID + "/works";

  fetch(ORCIDLink,
    {
      headers: {
        "Accept": "application/orcid+json"
      }
    })
    .then(
      function (response) {
        data = response;
        if (response.status !== 200) { //om det inte är okej
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        // Examine the text in the response
        response.json().then(function (data) {

          ////DEBUG!
          // console.log(data);

          var output2018 = "";
          var output2017 = "";
          var output2016 = "";
          var output2015 = "";
          var output2014 = "";
          var output2013 = "";
          var outputEarlier = "";
          var loading = "true";


          for (var i in data.group) {

            //PAPER NAME
            if (data.group[i]["work-summary"]["0"].title.title.value != null) {
              var publicationName = data.group[i]["work-summary"]["0"].title.title.value;
              console.log("Här är NAME ", publicationName);
            }

            //PUBLICATION YEAR
            if (data.group[i]["work-summary"]["0"]["publication-date"] != null) {
              var publicationYear = data.group[i]["work-summary"]["0"]["publication-date"].year.value;
              console.log("Här är YEAR ", publicationYear);
            } else {
              var publicationYear = "";
            }

            //DOI REFERENCE (länka till adressen verkar det som)
            if (data.group[i]["external-ids"]["external-id"]["length"] != 0) {
              for (var j in data.group[i]["external-ids"]["external-id"]) {
                if (data.group[i]["external-ids"]["external-id"][j]["external-id-type"] == 'doi') {
                  var doiReference = data.group[i]["external-ids"]["external-id"][j]["external-id-value"];
                  console.log("Här är DOI ", doiReference);
                  break;
                }
              }
            } else {
              var doiReference = "";
            }



            //JOURNAL NAME
            var putcode = data.group[i]["work-summary"]["0"]["put-code"];
            console.log("Här är journal name ", putcode);
            //console.log(journalTitle);

            if (publicationYear == 2018) {
              output2018 += "<p><strong>" + publicationName + "</strong>";
              output2018 += " (" + publicationYear + ") ";
              output2018 += "<span id='publication_" + i + "'> </span> <em id = 'author_" + i + "'></em>";
              output2018 += " <a href='https://doi.org/" + doiReference + "'> " + doiReference + "</a></p>";

            } if (publicationYear == 2017) {
              output2017 += "<p><strong>" + publicationName + "</strong>";
              output2017 += " (" + publicationYear + ") </em>";
              output2017 += "<span id='publication_" + i + "'> </span> <em id = 'author_" + i + "'></em>";
              output2017 += " <a href='https://doi.org/" + doiReference + "'> " + doiReference + "</a></p>";

            } if (publicationYear == 2016) {
              output2016 += "<p><strong>" + publicationName + "</strong>";
              output2016 += " (" + publicationYear + ") </em></span>";
              output2016 += "<span id='publication_" + i + "'> </span> <em id = 'author_" + i + "'></em>";
              output2016 += " <a href='https://doi.org/" + doiReference + "'> " + doiReference + "</a></p>";

            } if (publicationYear == 2015) {
              output2015 += "<p><strong>" + publicationName + "</strong>";
              output2015 += " (" + publicationYear + ") </em></span>";
              output2015 += "<span id='publication_" + i + "'> </span> <em id = 'author_" + i + "'></em>";
              output2015 += " <a href='https://doi.org/" + doiReference + "'> " + doiReference + "</a></p>";

            } if (publicationYear == 2014) {
              output2014 += "<p><strong>" + publicationName + "</strong>";
              output2014 += " (" + publicationYear + ") </em></span>";
              output2014 += "<span id='publication_" + i + "'> </span> <em id = 'author_" + i + "'></em>";
              output2014 += " <a href='https://doi.org/" + doiReference + "'> " + doiReference + "</a></p>";

            } if (publicationYear == 2013) {
              output2013 += "<p><strong>" + publicationName + "</strong>";
              output2013 += " (" + publicationYear + ") </em></span>";
              output2013 += "<span id='publication_" + i + "'> </span> <em id = 'author_" + i + "'></em>";
              output2013 += " <a href='https://doi.org/" + doiReference + "'> " + doiReference + "</a></p>";

            } if (publicationYear < 2013) {
              outputEarlier += "<p><strong>" + publicationName + "</strong>";
              outputEarlier += " (" + publicationYear + ") </em></span>";
              outputEarlier += "<span id='publication_" + i + "'> </span> <em id = 'author_" + i + "'></em>";
              outputEarlier += " <a href='https://doi.org/" + doiReference + "'> " + doiReference + "</a></p>";

            }
            getJournalTitleAndAuthors(orcidID, putcode, i);

            document.getElementById("publications2018").innerHTML = output2018;
            document.getElementById("publications2017").innerHTML = output2017;
            document.getElementById("publications2016").innerHTML = output2016;
            document.getElementById("publications2015").innerHTML = output2015;
            document.getElementById("publications2014").innerHTML = output2014;
            document.getElementById("publications2013").innerHTML = output2013;
            document.getElementById("publicationsEarlier").innerHTML = outputEarlier;
            loading = "false";
          }

          if (output2018 == "") {
            var x = document.getElementById("element2018");
            x.style.display = "none";
          }

          if (output2017 == "") {
            var x = document.getElementById("element2017");
            x.style.display = "none";
          }

          if (output2016 == "") {
            var x = document.getElementById("element2016");
            x.style.display = "none";
          }

          if (output2015 == "") {
            var x = document.getElementById("element2015");
            x.style.display = "none";
          }

          if (output2014 == "") {
            var x = document.getElementById("element2014");
            x.style.display = "none";
          }

          if (output2013 == "") {
            var x = document.getElementById("element2013");
            x.style.display = "none";
          }

          if (outputEarlier == "") {
            var x = document.getElementById("elementEarlier");
            x.style.display = "none";
          }

          if (loading == "false") {
            var x = document.getElementById("loader");
            x.style.display = "none";
            var y = document.getElementById("myPublications");
            y.style.display = "";
          }

        });
      }
    )
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });
}

//Hämtar mer specifik data om EN publikation
function getJournalTitleAndAuthors(orcidID, journalID, i) {
  var ORCIDLink = "https://pub.orcid.org/v2.0/" + orcidID + "/work/" + journalID;
  fetch(ORCIDLink, {
    headers: {
      "Accept": "application/orcid+json"
    }
  })
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
        
        response.json().then(function (data) {
          //journal title
          if (data["journal-title"] != null) {
            var output = data["journal-title"].value + ".";
            document.getElementById("publication_" + i).innerHTML = document.getElementById("publication_" + i).innerHTML + output;
          }
          //authors
          var authors = "";
          if (data["contributors"]["contributor"]["length"] != 0) {
            for (var j in data["contributors"]["contributor"]) {
              if (j == 0){
              authors += " " + data["contributors"]["contributor"][j]["credit-name"].value;
              } else {
              authors += ", " + data["contributors"]["contributor"][j]["credit-name"].value;
              }
            }
            document.getElementById("author_" + i).innerHTML = document.getElementById("author_" + i).innerHTML + authors;
          } else {
            var authors = "";
          }


        });
      }
    )
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });
}




