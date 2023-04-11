# ptp_front_page

![](https://ptuml.hackmd.io/svg/SoWkIImgAStDuUAApYugICpBZmMoYb8JaqjYyfvszZvVlVxvrfOdkxV5AYGMAu35WVBbcNaf-ULwGBqbgM09C0ieaPcNMQANLGmM0x6vk226AkZgsa5qArYzREn-iR272oIjeATd1z6hOFLqxOodhKkVTinzkhpxQSCUBeYm3KW5LEEBTGrF-wV1LJpPiUpvbFdFEYOK5ELNLCRaFLkmyzdaMS-x6vwrTZ-RilF5kgwN2zS_NxBhQUlof-jsmXo2P2DKmvGLppgsFPlS-sJl7A2NcpO_RT-LMfQQ1tIxGsfU2YXe0000)

state 為代理，負責儲存與管理狀態資料，並在使用者操作時更新狀態，從而將 krpano 和 react 解耦，實現對狀態的代理控制。

其中 krpano 為 Model，負責處理使用者操作事件並更新狀態；react 為 View，負責顯示介面；state 為 Controller，負責管理狀態，並與 Model 和 View 進行交互。


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