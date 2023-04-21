# ptp_front_page

![](https://ptuml.hackmd.io/svg/RL6xJiCm5Dtz5Vw1y04LGbqOMEcQnI913JHEvBW4jbGAAiY534200ggOg8HQeG95ei3Nr7Ro5xXvqKgCzvxZyxYkUnGHshPReEsP16eRi4dj5gobCUDN0z4zbPT3EMJyAm8Pe0Zxn4NOWJK--vJFh1X1iLMuXIswjkSfmia3VsAy5oUlNH7VWXBG5CctiE7uYWHvEE6Z6-WIiq4HDPU4R6JXVuNAn-lQ2clmaJpsu2vnCDt4nbRkfkDa7F0ehWnqNCcfdNDu14e59KPCj4FBQjkBGRw7yzaKvC1AyZI8qiuvL7ThOEHwJOT2vSD_hYKBn36JqmuVz-61PVewhQvR7YyD9Ygik3YRVzzNbPVLnTsRY5_oX31Nh7fhVqaBMXOLvbbbFynSGTt4nk9dVm40)

其中，React 組件負責的是 View 的呈現，Krpano 與 Init.js 負責的是 Model 的管理，而 Windows 中的 proxy 物件負責 Controller 的角色。

具體來說，當使用者透過網頁開啟應用程式時，Html 會負責呼叫 Krpano 與 Init.js 來進行初始化，同時也會呼叫 React 來建立相應的組件。當使用者進行操作時， Krpano 會更新 Proxy 的狀態，當 Windows 讀取到 proxy 的狀態改變時，就會通過 React 來更新視圖，以反映出使用者的行為。

## 資料夾位置
* `W:\nmth\entangledthings\beta\v0`
* `W:\nmth\entangledthings\beta\v0\vr\images\intro`

## minimap
= "{
id:`"& D2 & "`,
scene:`" & E2 & "`,
sceneList:`" & F2 & "`,
cx:`" & G2 & "`,
cy:`" & H2 & "`,
r:`" & I2 & "`},"

= "{id:`"& D2 & "`,scene:`" & E2 & "`,sceneList:`" & F2 & "`,cx:`" & G2 & "`,cy:`" & H2 & "`,r:`" & I2 & "`},"

## B
```
=if(len(G4)=10,"{title:{img:`"&G4&"`,imgHover:`"&H4&"`,imgSelect:`"&I4&"`,},items:[]},","{img:`"&G4&"`,imgHover:`"&H4&"`,goToScene:`"&L4&"`,sceneList:`"&K4&"`,imgSelect:`"&I4&"`,},")
```

## C大單元
```
=SUBSTITUTE(B2&":{
zh:{
title:`"&D2&"`,
subtitle:`"&F2&"`,
img:`"&if(H2<>0,H2,"")&"`,
content:`"&I2&"`,
bigContent:`"&K2&"`,
},
en:{
title:`"&E2&"`,
subtitle:`"&G2&"`,
img:`"&if(H2<>0,H2,"")&"`,
content:`"&J2&"`,
bigContent:`"&L2&"`,
}
},","","")


```

## D小單元
```
=SUBSTITUTE(B2&":{
zh:{
title:`"&D2&"`,
subtitle:`"&F2&"`,
img:`"&if(H2<>0,H2,"")&"`,
content:`"&I2&"`
},
en:{
title:`"&E2&"`,
subtitle:`"&G2&"`,
img:`"&if(H2<>0,H2,"")&"`,
content:`"&J2&"`
}
},","","")
```

## F看這
```
=SUBSTITUTE(B2&":{
zh:{
title:`"&C2&"`,
subtitle:`"&E2&"`,
content:`"&G2&"`,
bindScene:`"&J2&"`,
isStartOnlyOnce:"&IF(K2="O","true","false")&",
},
en:{
title:`"&D2&"`,
subtitle:`"&F2&"`,
content:`"&H2&"`,
bindScene:`"&J2&"`,
isStartOnlyOnce:"&IF(K2="O","true","false")&",
}
},","","")

=SUBSTITUTE(B2&":{zh:{title:`"&C2&"`,subtitle:`"&E2&"`,content:`"&G2&"`,bindScene:`"&J2&"`,isStartOnlyOnce:"&IF(K2="O","true","false")&",},en:{title:`"&D2&"`,subtitle:`"&F2&"`,content:`"&H2&"`,bindScene:`"&J2&"`,isStartOnlyOnce:"&IF(K2="O","true","false")&",}},","","")
```

## iframe
```
= A2 &":{
url:`" & B2 & "`,
isFullScreen:" & if(C2="O","true","false") & "
},"

= A2 &":{url:`" & B2 & "`,isFullScreen:" & if(C2="O","true","false") & "},"
```

## krpano action
1. 在 document 中設定

## 連結
* [GoogleSheet](https://docs.google.com/spreadsheets/d/1AUjGNWYARrjEZL7uP_UVpAVlXV5QJAAlPf_s5r9RdiM/edit#gid=1060741455)