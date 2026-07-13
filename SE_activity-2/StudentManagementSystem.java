import java.util.Scanner;

public class StudentManagementSystem {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        // =====================================================
        // INCREMENT 1 : STUDENT REGISTRATION
        // Feature Added:
        // - Enter Student Name
        // - Enter Roll Number
        // =====================================================

        System.out.println("========== STUDENT MANAGEMENT SYSTEM ==========\n");

        System.out.print("Enter Student Name : ");
        String name = sc.nextLine();

        System.out.print("Enter Roll Number  : ");
        int roll = sc.nextInt();

        // =====================================================
        // INCREMENT 2 : ADD MARKS
        // New Feature Added:
        // - Enter Student Marks
        // =====================================================

        System.out.print("Enter Marks        : ");
        int marks = sc.nextInt();

        // =====================================================
        // INCREMENT 3 : GRADE CALCULATION
        // New Feature Added:
        // - Calculate Grade based on Marks
        // =====================================================

        char grade;

        if (marks >= 90)
            grade = 'A';
        else if (marks >= 75)
            grade = 'B';
        else if (marks >= 60)
            grade = 'C';
        else
            grade = 'F';

        // =====================================================
        // INCREMENT 4 : PASS / FAIL RESULT
        // New Feature Added:
        // - Display PASS or FAIL
        // =====================================================

        String result;

        if (marks >= 35)
            result = "PASS";
        else
            result = "FAIL";

        // =====================================================
        // FINAL STUDENT MANAGEMENT SYSTEM
        // Displays complete student information
        // =====================================================

        System.out.println("\n=======================================");
        System.out.println("         STUDENT REPORT");
        System.out.println("=======================================");
        System.out.println("Student Name : " + name);
        System.out.println("Roll Number  : " + roll);
        System.out.println("Marks        : " + marks);
        System.out.println("Grade        : " + grade);
        System.out.println("Result       : " + result);
        System.out.println("=======================================");

        sc.close();
    }
}