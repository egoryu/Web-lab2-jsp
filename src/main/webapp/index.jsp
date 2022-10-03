<%@ page contentType="text/html;charset=UTF-8" %>

<%@ page import="data.ResultList" %>
<%@ page import="data.Result" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Лабораторная работа по Web-программированию №2</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/style.css">
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
</head>
<body>

<table id="main-table">
    <tr>
        <td id="header-plate" colspan="2">
            Никитин Егор Алексеевич<br> Группа P32111 <br> Вариант: 1189
        </td>
    </tr>
    <tr>
        <th class="title-plate">Визуализация</th>
        <th class="title-plate">Ввод данных</th>
    </tr>
    <tr>
        <td class="image-container">
            <canvas id="plot" width="320" height="320">Интерактивная область графика</canvas>
        </td>
        <td class="content-plate">
            <form id="former" method="post" action="${pageContext.request.contextPath}/process">
                <table id="input-grid">
                    <tr>
                        <td>
                            <label>Выберите X:</label>
                        </td>
                        <td>
                            <input class="x-checkbox" type="checkbox" name="x" value="-3">-3
                            <input class="x-checkbox" type="checkbox" name="x" value="-2">-2
                            <input class="x-checkbox" type="checkbox" name="x" value="-1">-1
                            <input class="x-checkbox" type="checkbox" checked name="x" value="0">0
                            <input class="x-checkbox" type="checkbox" name="x" value="1">1
                            <input class="x-checkbox" type="checkbox" name="x" value="2">2
                            <input class="x-checkbox" type="checkbox" name="x" value="3">3
                            <input class="x-checkbox" type="checkbox" name="x" value="4">4
                            <input class="x-checkbox" type="checkbox" name="x" value="5">5
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Введите Y:
                        </td>
                        <td>
                            <input id="y-textinput" type="text" maxlength="10" autocomplete="off" placeholder="-5..5" name="y" >
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Выберите R:
                        </td>

                        <td>
                            <input class="r-radio" type="radio" name="r" value="1">1
                            <input class="r-radio" type="radio" name="r" value="1.5">1.5
                            <input class="r-radio" type="radio" name="r" value="2">2
                            <input class="r-radio" type="radio" name="r" value="2.5">2.5
                            <input class="r-radio" type="radio" name="r" value="3" checked="checked">3
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input id="hide_timezone" type="hidden" name="timezone" value="">
                        </td>
                        <td>
                            <input class="button" type="submit" value="submit" id="send">
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <span class="text-error invisible" id="error"></span>
                        </td>
                    </tr>
                </table>
            </form>
        </td>
    </tr>
    <tr>
        <th class="title-plate" colspan=2>Результат</th>
    </tr>
    <tr>
        <td colspan=2>
            <table id="result-table">
                <tr class="table-header">
                    <th class="coords-col">X</th>
                    <th class="coords-col">Y</th>
                    <th class="coords-col">R</th>
                    <th class="time-col">Current time</th>
                    <th class="time-col">Execution time</th>
                    <th class="hit-col">Hit result</th>
                </tr>
                <%
                    ResultList resultList;
                    if (session.getAttribute("results") == null) {
                        resultList = new ResultList();
                    } else {
                        resultList = (ResultList) session.getAttribute("results");
                    }
                    for (Result result : resultList) {
                %>
                <tr>
                    <td><%=result.getX()%></td>
                    <td><%=result.getY()%></td>
                    <td><%=result.getR()%></td>
                    <td><%=result.getCurrTime()%></td>
                    <td><%=result.getExecTime()%> нс</td>
                    <td><%=result.isHitResult()%></td>
                </tr>
                <% } %>
            </table>
        </td>
    </tr>
</table>
<script src="${pageContext.request.contextPath}/js/draw.js"></script>
<script src="${pageContext.request.contextPath}/js/script.js"></script>
</body>
</html>