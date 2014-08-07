function ApiConnector(api_base){
    // this.BASE = "https://localhost/~ddcjoshuad/UVMRecruiter/api";
    // for proxying local requests to the VM
    this.PROXYBASE = "";
    this.BASE = api_base;
    this.user = {};
    this.user['id'] = "1" ;
    this.user['token'] = "planner";
    this.user['is_confirmed'] = true;
    
    // performs the ajax call to get our data
    ApiConnector.prototype.pullApiData = function pullApiData(URL, QUERYTYPE, CALLBACK){
      console.log(QUERYTYPE);
        if(QUERYTYPE.toLowerCase().indexOf("get") != -1){
            if(!window.Helper.isNull(window.USER)){
                if(URL.indexOf("?") != -1){
                    URL = this.PROXYBASE+this.BASE+URL;
                    URL += "&id="+window.USER.userId+"&token="+window.USER.userToken + "&format=json";
                }else{
                    URL = this.PROXYBASE+this.BASE+URL;
                    URL += "?id="+window.USER.userId+"&token="+window.USER.userToken + "&format=json";
                }
//                URL += "?id=1&token=recruiter";
//                console.log("URL");
//                console.log(URL);
            }else{
                URL = this.PROXYBASE+this.BASE+URL;
            }
        }
         console.log("url being queried:" + URL);
        // if we're in debug mode, simulate the response
        if(window.DEBUG && URL != (this.BASE + "/")){
            console.log("IN DEBUG MODE: NOT CALLING REMOTE SERVICE");
            this.simResponse(URL, CALLBACK);
        }else{
            $.ajax({
                type: QUERYTYPE,
                url: URL,
                dataType: "json",
                success: function(data){
                   //console.log(data);
                   //data = data.contents;

                    CALLBACK(data);
                },
                error: function(xhr, errorType, error){
                    console.log(xhr);
                    // alert("error when trying to initialize connection to the api");
                    switch(xhr.status){
                        case 500:
                            // internal server error
                            // consider leaving app
                            console.log("Error: api response = 500");
                            break;
                        case 404:
                            // not found, stop trying
                            // consider leaving app
                            console.log('Error: api response = 404');
                            break;
                        case 400:
                            // bad request
                            console.log("Error: api response = 400");
                            break;
                        case 422:
                            console.log("Error: api response = 422");
                            break;
                        case 200:
                            console.log("Pull API data: 200");
                            break;
                        default:
                            // alert("Error Contacting API: "+xhr.status);
                            break;
                    }
                }
            });
        }
    } // end pullApiData


    ApiConnector.prototype.pushApiData = function pushApiData(DATA, URL, QUERYTYPE, CALLBACK){
        URL = this.PROXYBASE+this.BASE+URL;


        console.log("url being queried:" + URL);
        console.log("data being pushed: ");
        console.log(DATA);
        console.log("query type:");
        console.log(QUERYTYPE);
        // if we're in debug mode, simulate the response
        if(window.DEBUG && URL != (this.BASE + "/")){
            console.log("IN DEBUG MODE: NOT CALLING REMOTE SERVICE");
            this.simResponse(URL, CALLBACK);
        }else{
            $.ajax({
                type: QUERYTYPE,
                url: URL,
                data: DATA,
                processData: false,
                contentType: 'application/json',
                dataType: "json",
                success: function(data){
                    console.log("push new api data success: ");
                    console.log(data);
                    if(!window.Helper.isNull(CALLBACK)){
                        CALLBACK(data);
                    }
                },
                error: function(xhr, errorType, error){
                    console.log(xhr);
                    alert("error when trying to initialize connection to the api");
                    switch(xhr.status){
                        case 500:
                            // internal server error
                            // consider leaving app
                            console.log("Error: api response = 500");
                            break;
                        case 404:
                            // not found, stop trying
                            // consider leaving app
                            console.log('Error: api response = 404');
                            break;
                        case 400:
                            // bad request
                            console.log("Error: api response = 400");
                            break;
                        case 422:
                            console.log("Error: api response = 422");
                            break;
                        case 200:
                            console.log("Pull API data: 200");
                            break;
                        default:
                            // alert("Error Contacting API: "+xhr.status);
                            break;
                    }
                }
            });
        }
    } // end pullApiData

    // ---- Study Area---
    ApiConnector.prototype.getStudyArea = function getStudyArea(id, callback){
        var url="/studyarea?id="+id;
        window.API.pullApiData(url, "GET", callback)
    }
    ApiConnector.prototype.getAllStudyAreas = function getStudyArea(callback){
        var url="/studyarea";
        window.API.pullApiData(url, "GET", callback)
    }
    ApiConnector.prototype.postStudyArea = function postStudyArea(study_area, callback){
        var url="/studyarea";
        var querytype="POST";
        var json={
            "study_area":study_area
        };
        var jsonString = JSON.stringify(json);
        window.API.pushApiData(jsonString, url, querytype, callback);
    }

    //  ----- placemarker
    ApiConnector.prototype.getPlacemarkers = function getPlacemarkers(study_area_id, callback){
        var url = "/placemarker?study_area_id=" + study_area_id;
        window.API.pullApiData(url, "GET", callback)
    }




    // ----- participant ----
    ApiConnector.prototype.postParticipant = function postParticipant(callback){
        var url="/participant";
        var querytype="POST";
        var json={};
        var jsonString = JSON.stringify(json);
        window.API.pushApiData(jsonString, url, querytype, callback);
    }

    ApiConnector.prototype.getParticipantProgress = function getParticipantProgress(participant_id, place_id, callback){
        var url="/response?place_id="+place_id+"&participant_id="+participant_id;
        window.API.pullApiData(url, "GET", callback);
    }


    // ----- audit ----
    ApiConnector.prototype.getAudit = function getAudit(audit_type_id, callback){
        var url="/audit?audit_type_id="+audit_type_id;
        window.API.pullApiData(url, "GET", callback);
    }

    // ----- response 
    ApiConnector.prototype.postResponse = function postResponse(response, callback){
        var url="/response";
        var querytype="POST";

        var json={
                "response": response
            };

        var jsonString = JSON.stringify(json);

        this.pushApiData(jsonString, url, querytype, callback);
    }

    ApiConnector.prototype.getResponses = function getResponses(place_id, callback){
        var url= "/response?place_id="+place_id;

        window.API.pullApiData(url, "GET", callback);
    }



}