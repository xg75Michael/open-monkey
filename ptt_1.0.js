// ==UserScript==
// @name            PTT Tasks Assistant
// @namespace       ptt-task-assistant-for-huawei.user.js
// @version         1.0
// @description     try to take over the world!
// @author          Michael Gao
// @include         https://live.pttgps.com/track/*
// @grant           none
// ==/UserScript==
;
window.onload = function() {
    //// Quick Unassigned Tasks Direction
    console.log('Quick Unassigned Tasks');
    let El_Unassigned_Tasks_Li = document.querySelector('#ibm-unav-projectsandtasks .ibm-unav-menu ul li a');
    El_Unassigned_Tasks_Li.href = "https://live.pttgps.com/track/asig/unassigned.php?tab=custom1";

    //// Quick Open Relative Tasks
    let Relative_Tasks_Links_Arr = [];
    let Ele_Nav_Relative_Pre_Task = document.getElementById('_relatedtask');
    if (!!Ele_Nav_Relative_Pre_Task) {
        console.log('Quick Open Relative Tasks');
        let Ele_Nav_Relative_Task = Ele_Nav_Relative_Pre_Task.parentElement.parentElement;
        console.log('Quick Open Relative Tasks222');
        let Ele_Nav_Relative_A_Tag = document.createElement('a');
        Ele_Nav_Relative_A_Tag.appendChild(document.createTextNode('Open Relative'));
        Ele_Nav_Relative_A_Tag.setAttribute('style', 'position: absolute;right: 0;top: -110%;');
        Ele_Nav_Relative_Task.appendChild(Ele_Nav_Relative_A_Tag);
        document.querySelectorAll('#datagrid_childtask a[href]').forEach(item => Relative_Tasks_Links_Arr.push(item.href));
        Ele_Nav_Relative_A_Tag.onmouseover = function() {
            Ele_Nav_Relative_A_Tag.style.color = '#E87E04';
        };
        Ele_Nav_Relative_A_Tag.onmouseout = function() {
            Ele_Nav_Relative_A_Tag.style.color = '#555555';
        };
        Ele_Nav_Relative_A_Tag.onclick = () => {
            if (Relative_Tasks_Links_Arr.length > 0) {
                Relative_Tasks_Links_Arr.map(item => window.open(item));
            } else {
                console.log('No Relative Tasks Founded!');
            }
        };
        console.log(Relative_Tasks_Links_Arr);
    }

    //// Counting Today's Tasks
    let Ele_Related_Links = document.getElementById('related-links');
    if (!!Ele_Related_Links && window.location.toString().indexOf('editid') < 0) {
        console.log('Counting Tasks');
        let Ele_Counting_Tasks = document.createElement('span');
        let Ele_Counting_Tasks_Tommorow = document.createElement('span');
        let Counting_Number = 0;
        let Counting_Number_Tommorow = 0;
        Ele_Counting_Tasks.style.fontSize = '2em';
        Ele_Counting_Tasks.style.color = '#E87E04';
        Ele_Counting_Tasks.style.fontWeight = '900';
        Ele_Counting_Tasks_Tommorow.style.fontSize = '1.5em';
        Ele_Counting_Tasks_Tommorow.style.color = '#E87E04';
        document.querySelectorAll('td[style]').forEach(item => item.innerText.indexOf((new Date()).getDate()) > 0 ? Counting_Number++ : Counting_Number_Tommorow++);
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
                let this_Preview = event.target;
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
                    myRequest = new XMLHttpRequest();
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
    }
    if (window.location.toString().indexOf('unassigned') < 0) {
        Ele_Related_Links.innerHTML = '';
    }




    //// Quick Download Attachments/
    let Ele_Nav_Attachment_Pre = document.getElementById('_details');
    if (!!Ele_Nav_Attachment_Pre) {
        console.log('Download Attachments');
        let Ele_Nav_Attachment = Ele_Nav_Attachment_Pre.parentElement.parentElement;
        let Ele_Nav_Attachment_A_Tag = document.createElement('a');
        let A_Tag_Text_Node = document.createTextNode('Download All');
        let attachments_Links_Arr = [];
        document.querySelectorAll('#attachmentTable a').forEach(ele => attachments_Links_Arr.push(ele.href));
        Ele_Nav_Attachment_A_Tag.setAttribute('style', 'position: absolute;right: 0;top: -110%;');
        Ele_Nav_Attachment_A_Tag.onmouseover = function() {
            Ele_Nav_Attachment_A_Tag.style.color = '#E87E04';
        };
        Ele_Nav_Attachment_A_Tag.onmouseout = function() {
            Ele_Nav_Attachment_A_Tag.style.color = '#555555';
        };
        Ele_Nav_Attachment_A_Tag.appendChild(A_Tag_Text_Node);
        Ele_Nav_Attachment.appendChild(Ele_Nav_Attachment_A_Tag);
        Ele_Nav_Attachment_A_Tag.onclick = () => {
            if (attachments_Links_Arr.length > 0) {
                attachments_Links_Arr.map(item => window.open(item));
            } else {
                console.log('No Attachment Founded!');
            }
        };
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

    //// Assignment Timeestimate
    let Ele_Time_Estimate = document.getElementById('assignment_timeestimate'),
        Ele_Search_Input = document.getElementById('q'),
        Task_ID = document.getElementById('assignment_id').innerText;
    if (!!Ele_Time_Estimate) {
        console.log('Assignment Timeestimate');
        let time_Total = Ele_Time_Estimate.innerText,
            WB_Time_Total = (Number(time_Total) * 0.7).toFixed(2),
            WB_Time_Record_Hour,
            WB_Time_Record_Min;
        WB_Time_Record_Hour = WB_Time_Total.split('.')[0];
        WB_Time_Record_Min = Math.floor((Number(WB_Time_Total.split('.')[1]) * 0.6).toString());
        WB_Time_Record_Min = (() => { return WB_Time_Record_Min >= 10 ? WB_Time_Record_Min : ('0' + WB_Time_Record_Min) })();
        Ele_Time_Estimate.innerHTML = time_Total + ' * 0.7 = ' + WB_Time_Total + ' = <a href="https://live.pttgps.com/track/rep/user.php?fdUser=4239&weeklysummary=true&submit=true" target="_blank">' + WB_Time_Record_Hour + ':' + WB_Time_Record_Min + '</a><span id="task_copy_or_not" style="color:#f0f;"></span>';
        Ele_Time_Estimate.onclick = function copy_task_id() {
            Ele_Search_Input.value = Task_ID;
            Ele_Search_Input.select();
            document.execCommand("Copy");
            let Task_Copy_Or_Not = document.getElementById('task_copy_or_not')
            Task_Copy_Or_Not.innerHTML = ' Task ID Copied!!';
        };

        //// Quick Time Recording
        // 'https://live.pttgps.com/track/time/add.php?reload=1&endhour=9:00&hour=9:01&user=4239&date=2020-06-18&proj=&task=1503850&ts=1592504539'
        let Ele_Quick_Time_Recording_Lable = Ele_Time_Estimate.previousElementSibling,
            Ele_Quick_Time_Recording_Container = document.createElement('span');
        Ele_Quick_Time_Recording_Container.setAttribute('id', 'Quick_Time_Recording_Container');
        Ele_Quick_Time_Recording_Container.innerHTML = '<span>Start:</span><select id="quick_time_hour_start" class="record_time_onchange"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09" selected>09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option></select><select id="quick_time_min_start" class="record_time_onchange"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option><select><span>Duration:</span><select id="quick_time_hour_duration" class="record_time_onchange"><option value="00">00</option><option value="01" selected>01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option></select><a id="quick_record_button">Quick Record</a>';
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
        // href="javascript:openwin('/track/time/add.php?reload=1&endhour=9:00&hour=9:00&user=4239&date=2020-06-19', 460, 470);"
        let Quick_Record_Button_Function_Para = "'/track/time/add.php?reload=1&endhour=9:01&hour=9:00&user=4239&date=" + Quick_Time_Record_Year + "-" + Quick_Time_Record_Month + "-" + Quick_Time_Record_Day + "&proj=&task=" + Task_ID.replace(/[^\d]/g, '') + "&ts='+getts(), 460, 470";
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
                Quick_Record_Button_Function_Para = "'/track/time/add.php?reload=1&endhour=" + Quick_Record_End_Time + ":" + Quick_Start_Min_Value + "&hour=" + Quick_Start_Hour_Value + ":" + Quick_Start_Min_Value + "&user=4239&date=" + Quick_Time_Record_Year + "-" + Quick_Time_Record_Month + "-" + Quick_Time_Record_Day + "&proj=&task=" + Task_ID.replace(/[^\d]/g, '') + "&ts='+getts(), 460, 470";
                Ele_Quick_Record_Button.setAttribute('href', "javascript:openwin(" + Quick_Record_Button_Function_Para + ");");
            }
        });
        console.log('Time Recording Para: ' + Quick_Record_Button_Function_Para);
    }

    //// Quick Assign To
    let Assign_To_Selections = document.getElementById('gworkflow_explore_owner');
    if (!!Assign_To_Selections) {
        console.log('Quick Assign To');
        let History_All_A_Links = document.querySelectorAll('#tab_history a');
        let History_WPL_Name = History_All_A_Links[History_All_A_Links.length - 2].innerText;
        console.log('WPL: ' + History_WPL_Name);
        let Ele_History_Tab = document.querySelector('#tab_history');
        console.log(Ele_History_Tab);
        let History_QA_Name = '';
        Ele_History_Tab.childNodes.forEach(item => {
            if (typeof item.innerText == 'string') {
                if (item.innerText.indexOf('--- Huawei.QA Reviewer') > 0) {
                    History_QA_Name = item.firstChild.firstChild.innerText;
                }
            }
        });
        console.log('QA: ' + History_QA_Name);
        let Last_Comments_Text = document.querySelector('.last_comments .nobold').innerText;
        let Last_Comments_Text_Name = Last_Comments_Text.slice(1, Last_Comments_Text.length - 1);
        if (Assign_To_Selections !== null) {
            // Queue
            let Assign_To_Selections_options = Assign_To_Selections.options;
            let Ele_Quick_Assign_To = document.createElement('span');
            Ele_Quick_Assign_To.appendChild(document.createTextNode(' Queue | '));
            Assign_To_Selections.parentElement.parentElement.appendChild(Ele_Quick_Assign_To);
            Ele_Quick_Assign_To.onmouseover = () => {
                Ele_Quick_Assign_To.style.color = '#E87E04';
            };
            Ele_Quick_Assign_To.onmouseout = () => {
                Ele_Quick_Assign_To.style.color = '#000';
            };
            Ele_Quick_Assign_To.onclick = () => {
                Assign_To_Selections = document.getElementById('gworkflow_explore_owner');
                Assign_To_Selections.value = '-1';
            };
            // WPL
            let Ele_Assign_To_WPL = document.createElement('span');
            Ele_Assign_To_WPL.appendChild(document.createTextNode('WPL: ' + History_WPL_Name));
            Assign_To_Selections.parentElement.parentElement.appendChild(Ele_Assign_To_WPL);
            Ele_Assign_To_WPL.onmouseover = () => {
                Ele_Assign_To_WPL.style.color = '#E87E04';
            };
            Ele_Assign_To_WPL.onmouseout = () => {
                Ele_Assign_To_WPL.style.color = '#000';
            };
            Ele_Assign_To_WPL.onclick = () => {
                for (let i = 0; i < Assign_To_Selections_options.length; i++) {
                    let Option_Innertext = Assign_To_Selections_options[i].innerText.toString().toLowerCase();
                    let Option_Innertext_Arr = Option_Innertext.split(/\s/);
                    Option_Innertext_Arr.pop();
                    let Option_innerText_Compare = Option_Innertext_Arr.join('');
                    let History_WPL_Name_Lower = History_WPL_Name.toLowerCase().replace(/\s/g, '');
                    if (Option_innerText_Compare == History_WPL_Name_Lower) {
                        document.getElementById('gworkflow_explore_owner').value = Assign_To_Selections_options[i].value;
                        console.log('Found WPL');
                    }
                }
            };
            // Last Comments
            let Ele_Assign_To_Last_Comments = document.createElement('span');
            Ele_Assign_To_Last_Comments.appendChild(document.createTextNode(' | Last: ' + Last_Comments_Text_Name));
            Assign_To_Selections.parentElement.parentElement.appendChild(Ele_Assign_To_Last_Comments);
            Ele_Assign_To_Last_Comments.onmouseover = () => {
                Ele_Assign_To_Last_Comments.style.color = '#E87E04';
            };
            Ele_Assign_To_Last_Comments.onmouseout = () => {
                Ele_Assign_To_Last_Comments.style.color = '#000';
            };
            Ele_Assign_To_Last_Comments.onclick = () => {
                for (let i = 0; i < Assign_To_Selections_options.length; i++) {
                    let Option_Innertext = Assign_To_Selections_options[i].innerText.toString().toLowerCase();
                    let Option_Innertext_Arr = Option_Innertext.split(/\s/);
                    Option_Innertext_Arr.pop();
                    let Option_innerText_Compare = Option_Innertext_Arr.join('');
                    let History_WPL_Name_Lower = History_WPL_Name.toLowerCase().replace(/\s/g, '');
                    if (Option_innerText_Compare == History_WPL_Name_Lower) {
                        document.getElementById('gworkflow_explore_owner').value = Assign_To_Selections_options[i].value;
                        console.log('Found Last Comments');
                    }
                }
            };
            // QA
            let Ele_Assign_To_QA = document.createElement('span');
            History_QA_Name === "" ? Ele_Assign_To_QA.appendChild(document.createTextNode(' | QA: None')) :
                Ele_Assign_To_QA.appendChild(document.createTextNode(' | QA: ' + History_QA_Name));
            Assign_To_Selections.parentElement.parentElement.appendChild(Ele_Assign_To_QA);
            Ele_Assign_To_QA.onmouseover = () => {
                Ele_Assign_To_QA.style.color = '#E87E04';
            };
            Ele_Assign_To_QA.onmouseout = () => {
                Ele_Assign_To_QA.style.color = '#000';
            };
            Ele_Assign_To_QA.onclick = () => {
                for (let i = 0; i < Assign_To_Selections_options.length; i++) {
                    let Option_Innertext = Assign_To_Selections_options[i].innerText.toString().toLowerCase();
                    let Option_Innertext_Arr = Option_Innertext.split(/\s/);
                    Option_Innertext_Arr.pop();
                    let Option_innerText_Compare = Option_Innertext_Arr.join('');
                    let History_QA_Name_Lower = History_QA_Name.toLowerCase().replace(/\s/g, '');
                    if (Option_innerText_Compare == History_QA_Name_Lower) {
                        document.getElementById('gworkflow_explore_owner').value = Assign_To_Selections_options[i].value;
                        console.log('Found QA');
                    }
                }
            };
        }
    }

    //// Quick Open Muti Test URLs
    function openMutiURL(selector) {
        let Ele_URL_Lable = document.querySelector(selector);
        if (!!Ele_URL_Lable) {
            let Ele_URL_Lable_Parent = Ele_URL_Lable.parentElement;
            let Empty_URL_Arr = [];
            let Input_or_Div = document.getElementById('assignment_testurl').nodeName === 'DIV';
            if (Input_or_Div) {
                Ele_URL_Lable_Parent.nextElementSibling.childNodes.forEach(el => {
                    if (el.nodeName === 'A') {
                        Empty_URL_Arr.push(el);
                    }
                });
            } else {
                Ele_URL_Lable_Parent.nextElementSibling.childNodes.forEach(el => {
                    Empty_URL_Arr = Ele_URL_Lable_Parent.nextElementSibling.children[0].value.split(/\n/g).slice(0);
                });
            }
            Ele_URL_Lable_Parent.onmouseover = function() {
                Ele_URL_Lable.style.color = '#E87E04';
            };
            Ele_URL_Lable_Parent.onmouseout = function() {
                Ele_URL_Lable.style.color = '#000';
            };
            Ele_URL_Lable.onclick = function() {
                if (Empty_URL_Arr.length > 0 && Empty_URL_Arr[0] !== "") {
                    if (Input_or_Div) {
                        Empty_URL_Arr.map(item => window.open(item.href));
                    } else {
                        Empty_URL_Arr.map(item => window.open(item));
                    }
                } else {
                    console.log('No Links!');
                }
            };
        }
    }
    openMutiURL('[for=assignment_testurl]');
    openMutiURL('[for=assignment_url]');
    openMutiURL('[for=assignment_liveurl]');
};