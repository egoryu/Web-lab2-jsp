package servlets;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/process")
public class ControllerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("index.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if (request.getParameter("clear") != null && request.getParameter("clear").equals("true")) {
            request.getRequestDispatcher("/clear").forward(request, response);
        } else if (request.getParameter("x") != null && request.getParameter("y") != null &&
                request.getParameter("r") != null) {
            request.getRequestDispatcher("/checkArea").forward(request, response);
        } else
            request.getRequestDispatcher("index.jsp").forward(request, response);
    }
}