(function (window) {
  var query = `query GetWidget($userId:Int!,$widgetsArr:[String!]!){
    getWidgetByUserId(id:$userId,widgets:$widgetsArr){
        _id
        widget_url {
          _id
          url
        }
      }
  }
    `;

  getAuthentication = async (widgets, id) => {
    // Api
    console.log("api adta", id, widgets);
    const result = await fetch(
      "https://nkbak76dn3.execute-api.ap-south-1.amazonaws.com/dev/gql",
      {
        method: "POST",
        headers: {
          "Authorization":null,
          "Content-Type": "application/json",
          Accept: "application/json",

        },
        body: JSON.stringify({
          query,
          variables: { userId: parseInt(id), widgetsArr: widgets },
        }),
      }
    );
    const finaldata = result.json();
    return finaldata;
    // return new Promise((resolve, reject) => {
    //   fetch("https://fkk5kovyag.execute-api.us-east-2.amazonaws.com/review", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //     },
    //     body: JSON.stringify({
    //       query,
    //       variables: { userId: parseInt(id), widgetsArr: widgets },
    //     }),
    //   })
    //     .then((r) => r.json())
    //     .then((res) => {
    //       resolve(res.data.getWidgetByUserId.widget_url);
    //     })
    //     .catch((err) => {
    //       resolve(console.log(err));
    //     });
    // });
  };

  getTools = async () => {
    var elementsClass = document.getElementsByClassName("z-widget");
    var scriptEl = document.getElementById("common-widget-script");
    var scriptWidget = scriptEl.getAttribute("widgets");

    // let widgetArr = elementsClass
    //   ? [...elementsClass]
    //   : [...JSON.parse(scriptWidget)];
    let widgetArr = JSON.parse(scriptWidget);
    console.log(widgetArr);
    let widgets = [];
    let api_data = [];
    widgetArr.map((widget) => {
      // let widget_temp = widget.nodeName.toLowerCase();
      let widget_temp = widget.toLowerCase();
      console.log("widget", widget_temp);
      widgets.push(widget_temp);
    });

    var id = scriptEl.getAttribute("data-user-id");
    console.log("User id", id);
    listApi = await getAuthentication(widgets, id);
    const finalList = listApi.data.getWidgetByUserId.widget_url;
    console.log(listApi.data.getWidgetByUserId.widget_url);
    // listApi.then((res) => {
    //   console.log(res);
    // });
    finalList.map((widgetDetail) => {
      setScript(widgetDetail.url);
    });
  };

  setScript = (scriptUrl) => {
    let newScript = document.createElement("script");
    newScript.setAttribute("src", scriptUrl);
    document.head.appendChild(newScript);
  };

  //   getTools();
  if (
    document.readyState === "complete" ||
    document.readyState === "loaded" ||
    document.readyState === "interactive"
  ) {
    getTools();
  } else {
    document.addEventListener("DOMContentLoaded", function (event) {
      getTools();
    });
  }
})(window);
