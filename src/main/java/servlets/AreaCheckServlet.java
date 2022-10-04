package servlets;

import data.Result;
import data.ResultList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;

@WebServlet("/checkArea")
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            long startTime = System.nanoTime();
            ResultList results;
            if (request.getSession().getAttribute("results") == null) results = new ResultList();
            else results = (ResultList) request.getSession().getAttribute("results");

            if (isValid(request.getParameter("x"), request.getParameter("y"), request.getParameter("r"))) {
                Result newResult = getResult(
                        request.getParameter("x"),
                        request.getParameter("y"),
                        request.getParameter("r"),
                        startTime,
                        Long.parseLong(request.getParameter("timezone")));
                results.addResult(newResult);
            }

            request.getSession().setAttribute("results", results);

        } catch (IllegalArgumentException e){
            response.setStatus(400);
        } finally {
            request.getRequestDispatcher("index.jsp").forward(request, response);
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("/index.jsp").forward(request, response);
    }

    private boolean validateX (String xVal) {
        try {
            double x = Double.parseDouble(xVal);
            List<Double> xRange = Arrays.asList(-3.0, -2.0, -1.0, 0.0, 1.0, 2.0, 3.0, 4.0, 5.0);
            return xRange.contains(x);
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private boolean validateY (String yVal) {
        try {
            double y = Double.parseDouble(yVal);
            return (y < 5.0 && y > -5.0);
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private boolean validateR (String rVal) {
        try {
            double r = Double.parseDouble(rVal);
            List<Double> rRange = Arrays.asList(1.0, 2.0, 3.0, 1.5, 2.5);
            return rRange.contains(r);
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private boolean isValid(String xVal, String yVal, String rVal){
        return validateX(xVal) && validateY(yVal) && validateR(rVal);
    }

    private boolean checkRectangle(double x, double y, double r){
        return (x >= 0 && y >= 0) && (x <= r) && (y <= r);
    }

    private boolean checkTriangle(double x, double y, double r) {
        return (x >= 0 && y <= 0) && (y >= 2 * x - r);
    }

    private boolean checkSector(double x, double y, double r) {
        return(x <= 0 && y >= 0) && (Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r / 2, 2));
    }

    private boolean checkHit(double x, double y, double r){
        return checkRectangle(x, y, r) || checkTriangle(x, y, r) || checkSector(x, y, r);
    }

    private Result getResult(String xVal, String yVal, String rVal, long startTime, long timezone) {
        double x = Double.parseDouble(xVal);
        double y = Double.parseDouble(yVal);
        double r = Double.parseDouble(rVal);

        OffsetDateTime currentTimeObject = OffsetDateTime.now(ZoneOffset.UTC);
        String currentTime;
        try {
            currentTimeObject = currentTimeObject.minusMinutes(timezone);
            currentTime = currentTimeObject.format(DateTimeFormatter.ofPattern("HH:mm:ss"));
        } catch (Exception exception) {
            currentTime = "HH:mm:ss";
        }

        String executionTime = String.valueOf(System.nanoTime() - startTime);
        return new Result(x, y, (int) r, currentTime, executionTime, checkHit(x,y,r));
    }

}