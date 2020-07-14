// ==UserScript==
// @name            PTT Tasks Assistant
// @namespace       ptt-task-assistant-for-huawei.user.js
// @version         1.1
// @description     try to take over the world!
// @author          Michael Gao
// @include         https://live.pttgps.com/track/*
// @grant           none
// ==/UserScript==
;
window.onload = function() {
    console.log('Monkey is on!');
    //// Foundation
    function HoverAndOutColor(e) {
        e.onmouseover = () => { e.style.color = '#E87E04' };
        e.onmouseout = () => { e.style.color = '#000' };
    }
    //// GET USER ID
    let user_ID_Num;
    let user_ID_Req = new XMLHttpRequest();
    user_ID_Req.onreadystatechange = function() {
        if (user_ID_Req.readyState == 4 && user_ID_Req.status == 200) {
            user_ID_Num = user_ID_Req.response.split('fdUser=')[1].split('&weeklysummary=')[0].toString();
            console.log('My User ID: ' + user_ID_Num);
            //// Assignment Timeestimate
            let Ele_Time_Estimate = document.getElementById('assignment_timeestimate'),
                Ele_Search_Input = document.getElementById('q'),
                Task_ID = document.getElementById('assignment_id').innerText,
                user_para = '';
            if (!!Ele_Time_Estimate) {
                console.log('Assignment Timeestimate');
                let time_Total = Ele_Time_Estimate.innerText,
                    WB_Time_Total = (Number(time_Total) * 0.7).toFixed(2),
                    WB_Time_Record_Hour,
                    WB_Time_Record_Min;
                WB_Time_Record_Hour = WB_Time_Total.split('.')[0];
                WB_Time_Record_Min = Math.floor((Number(WB_Time_Total.split('.')[1]) * 0.6).toString());
                WB_Time_Record_Min = (() => { return WB_Time_Record_Min >= 10 ? WB_Time_Record_Min : ('0' + WB_Time_Record_Min) })();
                Ele_Time_Estimate.innerHTML = time_Total + ' * 0.7 = ' + WB_Time_Total + ' = <a href="https://live.pttgps.com/track/rep/user.php?fdUser=' + user_ID_Num + '&weeklysummary=true&submit=true" target="_blank">' + WB_Time_Record_Hour + ':' + WB_Time_Record_Min + '</a><span id="task_copy_or_not" style="color:#f0f;"></span>';
                Ele_Time_Estimate.onclick = function copy_task_id() {
                    Ele_Search_Input.value = Task_ID;
                    Ele_Search_Input.select();
                    document.execCommand("Copy");
                    let Task_Copy_Or_Not = document.getElementById('task_copy_or_not')
                    Task_Copy_Or_Not.innerHTML = ' Task ID Copied!!';
                };

                //// Quick Time Recording
                let Ele_Quick_Time_Recording_Lable = Ele_Time_Estimate.previousElementSibling,
                    Ele_Quick_Time_Recording_Container = document.createElement('span');
                Ele_Quick_Time_Recording_Container.setAttribute('id', 'Quick_Time_Recording_Container');
                Ele_Quick_Time_Recording_Container.innerHTML = '<span>Start:</span><select id="quick_time_hour_start" class="record_time_onchange"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09" selected>09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option></select><select id="quick_time_min_start" class="record_time_onchange"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option><select><span>Duration:</span><select id="quick_time_hour_duration" class="record_time_onchange"><option value="00" selected>00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option></select><a id="quick_record_button">Quick Record</a>';
                Ele_Quick_Time_Recording_Lable.appendChild(Ele_Quick_Time_Recording_Container);
                let Ele_Quick_Record_Button = document.getElementById('quick_record_button'),
                    Quick_Start_Hour_Value = document.getElementById('quick_time_hour_start').value,
                    Quick_Start_Min_Value = document.getElementById('quick_time_min_start').value,
                    Quick_Start_Duration_Value = document.getElementById('quick_time_hour_duration').value,
                    Quick_Time_Record_Today = new Date(),
                    Quick_Time_Record_Year = Quick_Time_Record_Today.getFullYear(),
                    Quick_Time_Record_Month = Quick_Time_Record_Today.getMonth() + 1,
                    Quick_Time_Record_Day = Quick_Time_Record_Today.getDate(),
                    Quick_Record_End_Time;
                Quick_Record_End_Time = Number(Quick_Start_Hour_Value) + Number(Quick_Start_Duration_Value);
                // 注意: 需要替换 user=4239 参数
                Ele_Quick_Record_Button.setAttribute('style', 'color: #00f');
                //  + "&ts='+getts(), 460, 470)"
                let Quick_Record_Button_Function_Para = "'/track/time/add.php?reload=1&endhour=9:01&hour=9:00&user=" + user_ID_Num + "&date=" + Quick_Time_Record_Year + "-" + Quick_Time_Record_Month + "-" + Quick_Time_Record_Day + "&proj=&task=" + Task_ID.replace(/[^\d]/g, '') + "&ts='+getts(), 460, 470";
                Ele_Quick_Record_Button.setAttribute('href', "javascript:openwin(" + Quick_Record_Button_Function_Para + ");");
                // bind each input a onchange event
                document.querySelectorAll('.record_time_onchange').forEach(function(element) {
                    element.onchange = function() {
                        if (element.getAttribute('id') === 'quick_time_hour_start') {
                            Quick_Start_Hour_Value = this.value;
                        } else if (element.getAttribute('id') === 'quick_time_min_start') {
                            Quick_Start_Min_Value = this.value;
                        } else if (element.getAttribute('id') === 'quick_time_hour_duration') {
                            Quick_Start_Duration_Value = this.value;
                        }
                        Quick_Record_End_Time = Number(Quick_Start_Hour_Value) + Number(Quick_Start_Duration_Value);
                        Quick_Record_Button_Function_Para = "'/track/time/add.php?reload=1&endhour=" + Quick_Record_End_Time + ":" + Quick_Start_Min_Value + "&hour=" + Quick_Start_Hour_Value + ":" + Quick_Start_Min_Value + "&user=" + user_ID_Num + "&date=" + Quick_Time_Record_Year + "-" + Quick_Time_Record_Month + "-" + Quick_Time_Record_Day + "&proj=&task=" + Task_ID.replace(/[^\d]/g, '') + "&ts='+getts(), 460, 470";
                        Ele_Quick_Record_Button.setAttribute('href', "javascript:openwin(" + Quick_Record_Button_Function_Para + ");");
                    }
                });
                console.log('Time Recording Para: ' + Quick_Record_Button_Function_Para);
            }
        }
    };
    user_ID_Req.open('GET', 'https://live.pttgps.com/track/time/');
    user_ID_Req.send();

    //// Quick Unassigned Tasks Direction
    console.log('Quick Unassigned Tasks');
    let El_Unassigned_Tasks_Li = document.querySelector('#ibm-unav-projectsandtasks .ibm-unav-menu ul li a');
    El_Unassigned_Tasks_Li.href = "https://live.pttgps.com/track/asig/unassigned.php?tab=custom1";

    //// Quick Open Relative Tasks
    let R_T_Arr = [];
    let Ele_Rel_Task = document.getElementById('_relatedtask');
    if (!!Ele_Rel_Task) {
        console.log('Quick Open Relative Tasks');
        setTimeout(() => {
            let Ele_R_T_P = Ele_Rel_Task.parentElement.parentElement;
            let Ele_Rel_Tag = document.createElement('a');
            Ele_Rel_Tag.appendChild(document.createTextNode('Open Relative'));
            Ele_Rel_Tag.setAttribute('style', 'position: absolute;right: 0;top: -110%;');
            Ele_R_T_P.appendChild(Ele_Rel_Tag);
            document.querySelectorAll('#tab_relatedtask a[href]').forEach(item => R_T_Arr.push(item.href));
            HoverAndOutColor(Ele_Rel_Tag);
            Ele_Rel_Tag.onclick = () => {
                if (R_T_Arr.length > 0) {
                    R_T_Arr.map(item => window.open(item));
                } else {
                    console.log('No Relative Tasks Founded!');
                }
            };
            console.log('Relative Tasks - ', R_T_Arr);
        }, 3000);
    }

    //// Counting Today's Tasks
    let Ele_Related_Links = document.getElementById('related-links');
    let El_Tasks_Pr_Trs = document.querySelectorAll('tr[class]');
    if (!!Ele_Related_Links && window.location.toString().indexOf('unassigned') > 0) {
        console.log('Counting Tasks');
        let Ele_Counting_Tasks = document.createElement('span');
        let Ele_Counting_Tasks_Tommorow = document.createElement('span');
        let Counting_Number = 0;
        let Counting_Number_Tommorow = 0;
        Ele_Counting_Tasks.style.fontSize = '2em';
        Ele_Counting_Tasks.style.color = '#E87E04';
        Ele_Counting_Tasks.style.fontWeight = '900';
        let toggle_Today_Task = false;
        Ele_Counting_Tasks.onclick = () => {
            toggle_Today_Task = !toggle_Today_Task;
            El_Tasks_Pr_Trs.forEach(item => {
                toggle_Today_Task ?
                    (item.childNodes[5].innerText.lastIndexOf(new Date().getDate()) > 0 ?
                        item.style.display = 'table-row' :
                        item.style.display = 'none',
                        Ele_Counting_Tasks.style.textShadow = '#02d 0px 0px 0.5vw') :
                    (item.style.display = 'table-row',
                        Ele_Counting_Tasks.style.textShadow = 'none');
            });
        };
        Ele_Counting_Tasks_Tommorow.style.fontSize = '1.5em';
        Ele_Counting_Tasks_Tommorow.style.color = '#E87E04';
        document.querySelectorAll('td[style]').forEach(item => item.innerText.lastIndexOf((new Date()).getDate()) > 6 ? Counting_Number++ : Counting_Number_Tommorow++);
        Ele_Counting_Tasks.appendChild(document.createTextNode(Counting_Number));
        Ele_Counting_Tasks_Tommorow.appendChild(document.createTextNode(Counting_Number_Tommorow));
        Ele_Related_Links.appendChild(document.createTextNode('Today Task Number:'));
        Ele_Related_Links.appendChild(Ele_Counting_Tasks);
        Ele_Related_Links.appendChild(document.createTextNode(' | Tommorow Task:'));
        Ele_Related_Links.appendChild(Ele_Counting_Tasks_Tommorow);
        //// Tasks Preivew
        let All_Ele_Tasks_A_Tag = document.querySelectorAll('#tasklister_83_3 tbody a');
        let Ele_Task_Preview_Cells = document.querySelectorAll('#tasklister_83_3 tbody tr>td:nth-child(2)');
        Ele_Task_Preview_Cells[1].style.width = '20vw';
        All_Ele_Tasks_A_Tag.forEach(item => {
            let Ele_Task_Preview = document.createElement('span');
            Ele_Task_Preview.appendChild(document.createTextNode('Peak'));
            Ele_Task_Preview.style.paddingLeft = '1vw';
            item.parentElement.appendChild(Ele_Task_Preview);
            // Preview Window
            let Ele_Preview_Window = document.createElement('div');
            // Ele_Preview_Window.appendChild(document.createTextNode('xxx'));
            // Ele_Preview_Window.style.paddingLeft = '1vw';
            Ele_Preview_Window.style.display = 'none';
            item.parentElement.appendChild(Ele_Preview_Window);
            Ele_Task_Preview.onmouseover = function() {
                Ele_Task_Preview.style.color = '#E87E04';
                Ele_Task_Preview.style.textDecoration = 'underline';
                Ele_Task_Preview.style.textDecorationColor = '#E87E04';
            };
            Ele_Task_Preview.onmouseout = function() {
                Ele_Task_Preview.style.color = '#555555';
                Ele_Task_Preview.style.textDecoration = 'none';
            };
            Ele_Task_Preview.onclick = function() {
                let my_Request_Response;
                let my_Response_Reg = new RegExp(/<.+?id="assignment_description".*?>/);
                let my_Request_Response_Step1, my_Request_Response_Step2, my_Request_Response_Step3, my_Request_Response_Step4;
                if (Ele_Preview_Window.style.display == 'block') {
                    Ele_Preview_Window.style.display = 'none';
                } else {
                    Ele_Preview_Window.style.display = 'block';
                }
                if (Ele_Preview_Window.innerHTML == '') {
                    let myRequest = new XMLHttpRequest();
                    myRequest.onreadystatechange = function() {
                        if (myRequest.readyState == 4 && myRequest.status == 200) {
                            my_Request_Response = myRequest.response;
                            my_Request_Response_Step1 = my_Request_Response.split(my_Response_Reg)[1];
                            my_Request_Response_Step2 = my_Request_Response_Step1.split('Attention!:')[0];
                            //?? 有隐藏的 <br> 无法删除
                            my_Request_Response_Step3 = my_Request_Response_Step2.replace(/\n+/g, ' ').replace(/<.+?>/g, '').replace(/\s+/, ' ').replace('<br>', '').replace(/\n+/, '').replace(/<\/?.+?>/g, "");
                            my_Request_Response_Step3.length < 150 ? my_Request_Response_Step4 = my_Request_Response_Step3 : my_Request_Response_Step4 = my_Request_Response_Step3.slice(0, 150) + '...';
                            Ele_Preview_Window.innerText = my_Request_Response_Step4;
                            console.log(my_Request_Response_Step4);
                        }
                    };
                    console.log(item.href);
                    myRequest.open('GET', item.href);
                    myRequest.send();
                }


            };
        });
        //// Task Filter Button
        console.log('Filter Buttons');
        // P0
        let El_Button_P0 = document.createElement('button');
        let toggle_P0 = false;
        El_Button_P0.appendChild(document.createTextNode('P0'));
        El_Button_P0.setAttribute('style', 'font-size: 1.5em;text-decoration: none;margin-bottom: 1vw;color: #E87E04;background-color: #fff;border: 1px solid #E87E04;border-radius: 0.4vw;padding: 2px 8px; margin-right: 1vw;');
        El_Button_P0.onmouseover = () => {
            El_Button_P0.style.color = '#fff';
            El_Button_P0.style.backgroundColor = '#E87E04';
        };
        El_Button_P0.onmouseout = () => {
            El_Button_P0.style.color = '#E87E04';
            El_Button_P0.style.backgroundColor = '#fff';
        };
        El_Button_P0.onclick = () => {
            toggle_P0 = !toggle_P0;
            El_Tasks_Pr_Trs.forEach(item => {
                toggle_P0 ?
                    (item.childNodes[0].innerText == '0' ?
                        item.style.display = 'table-row' :
                        item.style.display = 'none',
                        El_Button_P0.style.boxShadow = '#02d 0px 0px 0.5vw inset') :
                    (item.style.display = 'table-row',
                        El_Button_P0.style.boxShadow = 'none');
            });
        };
        let El_Buttons_container = document.createElement('div');
        El_Buttons_container.style.margin = '1vw 0 0 0';
        El_Buttons_container.appendChild(document.createTextNode('Choose One Only: '));
        El_Buttons_container.appendChild(El_Button_P0);
        // P1
        let El_Button_P1 = document.createElement('button');
        let toggle_P1 = false;
        El_Button_P1.appendChild(document.createTextNode('P1'));
        El_Button_P1.setAttribute('style', 'font-size: 1.5em;text-decoration: none;color: #E87E04;margin-bottom: 1vw;background-color: #fff;border: 1px solid #E87E04;border-radius: 0.4vw;padding: 2px 8px; margin-right: 1vw;');
        El_Button_P1.onmouseover = () => {
            El_Button_P1.style.color = '#fff';
            El_Button_P1.style.backgroundColor = '#E87E04';
        };
        El_Button_P1.onmouseout = () => {
            El_Button_P1.style.color = '#E87E04';
            El_Button_P1.style.backgroundColor = '#fff';
        };
        El_Button_P1.onclick = () => {
            toggle_P1 = !toggle_P1;
            El_Tasks_Pr_Trs.forEach(item => {
                toggle_P1 ?
                    (item.childNodes[0].innerText == '1' ?
                        item.style.display = 'table-row' :
                        item.style.display = 'none',
                        El_Button_P1.style.boxShadow = '#02d 0px 0px 0.5vw inset') :
                    (item.style.display = 'table-row',
                        El_Button_P1.style.boxShadow = 'none');
            });
        };
        El_Buttons_container.appendChild(El_Button_P1);
        Ele_Related_Links.appendChild(El_Buttons_container);
        // Off Subtype
        let tempSubtypeObj = {};
        El_Tasks_Pr_Trs.forEach(item => {
            let tempStr = item.childNodes[9].innerText;
            tempSubtypeObj[tempStr] === undefined ?
                tempSubtypeObj[tempStr] = 1 :
                tempSubtypeObj[tempStr]++;
        });
        for (i in tempSubtypeObj) {
            let El_Temp_Button = document.createElement('button');
            let ii = i;
            tempSubtypeObj['toggle_' + ii] = false;
            El_Temp_Button.appendChild(document.createTextNode(i));
            El_Temp_Button.setAttribute('style', 'font-size: 1.4em;text-decoration: none;color: #E87E04;margin-bottom: 1vw;background-color: #fff;border: 1px solid #E87E04;border-radius: 0.4vw;padding: 2px 8px; margin-right: 1vw;');
            El_Temp_Button.onmouseover = () => {
                El_Temp_Button.style.color = '#fff';
                El_Temp_Button.style.backgroundColor = '#E87E04';
            };
            El_Temp_Button.onmouseout = () => {
                El_Temp_Button.style.color = '#E87E04';
                El_Temp_Button.style.backgroundColor = '#fff';
            };
            El_Temp_Button.onclick = () => {
                tempSubtypeObj['toggle_' + ii] = !tempSubtypeObj['toggle_' + ii];
                El_Tasks_Pr_Trs.forEach(item => {
                    tempSubtypeObj['toggle_' + ii] ?
                        (item.childNodes[9].innerText == ii ?
                            item.style.display = 'table-row' :
                            item.style.display = 'none',
                            El_Temp_Button.style.boxShadow = '#02d 0px 0px 0.5vw inset') :
                        (item.style.display = 'table-row',
                            El_Temp_Button.style.boxShadow = 'none');
                });
            };
            El_Buttons_container.appendChild(El_Temp_Button);
            Ele_Related_Links.appendChild(El_Buttons_container);
        }
    }
    if (window.location.toString().indexOf('unassigned') < 0) {
        Ele_Related_Links.innerHTML = '';
    }

    //// Quick Download Attachments
    let Ele_Nav_Attachment_Pre = document.getElementById('_details');
    if (!!Ele_Nav_Attachment_Pre) {
        console.log('Quick Download Attachments');
        setTimeout(() => {
            let Ele_Nav_Attachment = Ele_Nav_Attachment_Pre.parentElement.parentElement;
            let Ele_Nav_Attachment_A_Tag = document.createElement('a');
            let A_Tag_Text_Node = document.createTextNode('Download All');
            let attachments_Links_Arr = [];
            document.querySelectorAll('#attachmentTable a').forEach(ele => attachments_Links_Arr.push(ele.href));
            Ele_Nav_Attachment_A_Tag.setAttribute('style', 'position: absolute;right: 0;top: -110%;');
            HoverAndOutColor(Ele_Nav_Attachment_A_Tag);
            Ele_Nav_Attachment_A_Tag.appendChild(A_Tag_Text_Node);
            Ele_Nav_Attachment.appendChild(Ele_Nav_Attachment_A_Tag);
            Ele_Nav_Attachment_A_Tag.onclick = () => {
                if (attachments_Links_Arr.length > 0) {
                    attachments_Links_Arr.map(item => window.open(item));
                } else {
                    console.log('No Attachment Founded!');
                }
            };
        }, 3000);
    }

    //// Nav Local Standard
    let myCountryName = ["DE", "ES", "FR", "IT", "UK", "NL", "BE", "BE-FR", "CH-FR", "CH", "IE", "PT", "EN", "SE", "NO", "FI", "DK", "PL", "RO", "CZ", "HU", "GR", "RS", "AT", "SK", "MK", "LT", "LV", "BG", "EE", "HR", "CY", "ZA", "SA", "AE-EN", "AE", "FA", "EG", "PK", "LEVANT", "MA", "KE", "SA_EN", "KW-EN", "KW", "LEVANT-AR", "QA", "QA-AR", "OM-AR", "OM", "TH", "MM", "VN", "BD", "AU", "MY", "SG", "ID", "PH", "NZ", "TR", "KZ", "UA", "BY", "LATIN-EN", "LATIN", "MX", "PE", "CO", "AR", "CR", "CL", "CA", "CA-FR", "RU", "IN", "KR", "JP", "US", "HK", "TW", "CN"],
        myCountryCode = ["5", "6", "7", "8", "12", "13", "14", "15", "16", "17", "18", "19", "11", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "90", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "79", "83", "84", "89", "85", "86", "87", "88", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "80"],
        Ele_Nav_History = document.getElementById('nav_history'),
        Ele_Task_Name = document.getElementById('assignment_proj'),
        Task_Country_Name = '',
        Task_Country_Code = '';
    if (!!Ele_Nav_History) {
        // 获取国家的名字用于之后的 LS
        console.log('Local Standard');
        Task_Country_Name = Ele_Task_Name.innerText.split(' ').pop();
        Task_Country_Code = myCountryCode[myCountryName.indexOf(Task_Country_Name)];
        let Ele_Add_Nav_Localstandard_Li = document.createElement('li');
        Ele_Add_Nav_Localstandard_Li.setAttribute('id', 'nav_localstandard');
        Ele_Add_Nav_Localstandard_Li.setAttribute('class', 'ui-state-default ui-corner-top');
        Ele_Add_Nav_Localstandard_Li.onmouseover = function() {
            Ele_Add_Nav_Localstandard_Li.setAttribute('class', 'ui-state-default ui-corner-top ui-state-hover');
        };
        Ele_Add_Nav_Localstandard_Li.onmouseout = function() {
            Ele_Add_Nav_Localstandard_Li.setAttribute('class', 'ui-state-default ui-corner-top');
        };
        let Ele_Nav_localstandard_link = document.createElement('a');
        Ele_Nav_localstandard_link.setAttribute('target', '_blank');
        // 根据国家名字拼接连接
        Task_Country_Code >= 0 ? (Ele_Nav_localstandard_link.setAttribute('href', 'http://10.96.153.66/hw_standard/site/language/' + Task_Country_Code)) :
            (Ele_Nav_localstandard_link.setAttribute('href', 'http://10.96.153.66/hw_standard/'));
        Ele_Nav_localstandard_link.appendChild(document.createTextNode('Local Standard'));
        // append Local Standard 节点
        Ele_Add_Nav_Localstandard_Li.appendChild(Ele_Nav_localstandard_link);
        Ele_Nav_History.parentElement.appendChild(Ele_Add_Nav_Localstandard_Li);

        //// 标签栏中 History 右侧添加第二个标签 Tool
        let Ele_Add_Nav_Tool_Li = document.createElement('li');
        Ele_Add_Nav_Tool_Li.setAttribute('id', 'nav_localstandard');
        Ele_Add_Nav_Tool_Li.setAttribute('class', 'ui-state-default ui-corner-top');
        Ele_Add_Nav_Tool_Li.onmouseover = function() {
            Ele_Add_Nav_Tool_Li.setAttribute('class', 'ui-state-default ui-corner-top ui-state-hover');
        };
        Ele_Add_Nav_Tool_Li.onmouseout = function() {
            Ele_Add_Nav_Tool_Li.setAttribute('class', 'ui-state-default ui-corner-top');
        };
        let Ele_Nav_Tool_link = document.createElement('a');
        Ele_Nav_Tool_link.setAttribute('href', '#');
        Ele_Nav_Tool_link.appendChild(document.createTextNode('Tools?'));
        // append Tool 节点
        Ele_Add_Nav_Tool_Li.appendChild(Ele_Nav_Tool_link);
        Ele_Nav_History.parentElement.appendChild(Ele_Add_Nav_Tool_Li);
    }



    //// Quick Assign To
    // gworkflow_explore_owner has loading delay
    (function assign_To_Ready() {
        if (window.location.toString().indexOf('editid') > 0) {
            let setInterval_Counting = 0;
            let finding_Assign_To_Inter = setInterval(() => {
                let Assign_To_Selections = document.getElementById('gworkflow_explore_owner');
                if (Assign_To_Selections) {
                    // find WPL, QA, Last Comment name
                    console.log('Found #gworkflow_explore_owner', Assign_To_Selections);
                    let History_All_A_Links = document.querySelectorAll('#tab_history a');
                    let History_WPL_Name = History_All_A_Links[History_All_A_Links.length - 2].innerText;
                    let Ele_History_Tab = document.querySelector('#tab_history');
                    let History_QA_Name = '';
                    Ele_History_Tab.childNodes.forEach(item => {
                        if (typeof item.innerText == 'string') {
                            if (item.innerText.indexOf('--- Huawei.QA Reviewer') > 0) {
                                History_QA_Name = item.firstChild.firstChild.innerText;
                            }
                        }
                    });
                    let Last_Comments_Text = document.querySelector('.last_comments .nobold').innerText;
                    let Last_Comments_Text_Name = Last_Comments_Text.slice(1, Last_Comments_Text.length - 1);
                    console.log('WPL: ' + History_WPL_Name, 'QA Name: ' + History_QA_Name, 'Last Comment Name: ' + Last_Comments_Text_Name);
                    // Queue
                    let Ele_Quick_Assign_To = document.createElement('span');
                    Ele_Quick_Assign_To.appendChild(document.createTextNode(' Queue | '));
                    Assign_To_Selections.parentElement.parentElement.appendChild(Ele_Quick_Assign_To);
                    HoverAndOutColor(Ele_Quick_Assign_To);
                    Ele_Quick_Assign_To.onclick = () => {
                        Assign_To_Selections = document.getElementById('gworkflow_explore_owner');
                        Assign_To_Selections.value = '-1';
                    };
                    // select the right name function
                    function AssignTaskToPerson(e, n) {
                        e.onclick = () => {
                            Assign_To_Selections = document.getElementById('gworkflow_explore_owner');
                            let opts = Assign_To_Selections.options;
                            // loop for comparing options'name and name
                            for (let i = 0; i < opts.length; i++) {
                                let o_t = opts[i].innerText.toString().toLowerCase();
                                let o_a = o_t.split(/\s/);
                                o_a.pop();
                                let o_c = o_a.join(''),
                                    n_c = n.toLowerCase().replace(/\s/g, '');
                                if (o_c == n_c) {
                                    Assign_To_Selections.value = opts[i].value;
                                    console.log(n);
                                }
                            }
                        }
                    };
                    // WPL
                    let Ele_Assign_To_WPL = document.createElement('span');
                    Ele_Assign_To_WPL.appendChild(document.createTextNode('WPL: ' + History_WPL_Name));
                    Assign_To_Selections.parentElement.parentElement.appendChild(Ele_Assign_To_WPL);
                    HoverAndOutColor(Ele_Assign_To_WPL);
                    AssignTaskToPerson(Ele_Assign_To_WPL, History_WPL_Name);
                    // Last Comments
                    let Ele_Assign_To_Last_Comments = document.createElement('span');
                    Ele_Assign_To_Last_Comments.appendChild(document.createTextNode(' | Last: ' + Last_Comments_Text_Name));
                    Assign_To_Selections.parentElement.parentElement.appendChild(Ele_Assign_To_Last_Comments);
                    HoverAndOutColor(Ele_Assign_To_Last_Comments);
                    AssignTaskToPerson(Ele_Assign_To_Last_Comments, Last_Comments_Text_Name);
                    // QA
                    let Ele_Assign_To_QA = document.createElement('span');
                    History_QA_Name === "" ? Ele_Assign_To_QA.appendChild(document.createTextNode(' | QA: None')) :
                        Ele_Assign_To_QA.appendChild(document.createTextNode(' | QA: ' + History_QA_Name));
                    Assign_To_Selections.parentElement.parentElement.appendChild(Ele_Assign_To_QA);
                    HoverAndOutColor(Ele_Assign_To_QA);
                    AssignTaskToPerson(Ele_Assign_To_QA, History_QA_Name);
                    clearInterval(finding_Assign_To_Inter);
                } else {
                    setInterval_Counting++
                    if (setInterval_Counting > 10) {
                        clearInterval(finding_Assign_To_Inter);
                        console.log('Interval died!');
                    }
                    console.log('does not find assignment_timeestimate');
                }
            }, 500);
        }
    })();
    //// Quick Open Muti Test URLs
    function openMutiURL(s) {
        let e = document.querySelector(s);
        // if selector exist
        if (!!e) {
            let e_p = e.parentElement,
                u_arr = [],
                isdiv = document.getElementById('assignment_testurl').nodeName === 'DIV';
            HoverAndOutColor(e_p);
            let e_p_a = e_p.nextElementSibling.childNodes;
            e.onclick = () => {
                // reset url arr
                u_arr = [];
                // push urls into arr
                isdiv ? e_p_a.forEach(e => { if (e.nodeName === 'A') { u_arr.push(e); } }) :
                    e_p_a.forEach(e => { u_arr = e_p.nextElementSibling.children[0].value.split(/\n/g).slice(0); });
                u_arr[0] !== "" ? (isdiv ? u_arr.map(i => window.open(i.href)) : u_arr.filter(item => item.indexOf('http') > -1).map(i => window.open(i))) : console.log('No Links!');
            };
        }
    }
    openMutiURL('[for=assignment_testurl]');
    openMutiURL('[for=assignment_url]');
    openMutiURL('[for=assignment_liveurl]');
};