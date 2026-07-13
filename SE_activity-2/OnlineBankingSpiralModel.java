import java.util.Scanner;

public class OnlineBankingSpiralModel {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        // =====================================================
        // SPIRAL MODEL - ONLINE BANKING SYSTEM
        // =====================================================

        // =====================================================
        // SPIRAL 1
        // Planning:
        // Develop a Login Module.
        //
        // Risk Analysis:
        // Risk - Invalid username/password.
        // Solution - Validate user credentials.
        //
        // Engineering:
        // Login implementation.
        //
        // Evaluation:
        // Customer requested Balance Enquiry.
        // =====================================================

        System.out.print("Enter Username : ");
        String username = sc.nextLine();

        System.out.print("Enter Password : ");
        String password = sc.nextLine();

        if (username.equals("admin") && password.equals("1234")) {

            System.out.println("\nLogin Successful");

            // =================================================
            // SPIRAL 2
            // Planning:
            // Add Balance Enquiry.
            //
            // Risk Analysis:
            // Only authenticated users should view balance.
            //
            // Engineering:
            // Display account balance.
            //
            // Evaluation:
            // Customer requested Deposit and Withdraw features.
            // =================================================

            double balance = 50000;

            System.out.println("Available Balance : ₹" + balance);

            // =================================================
            // SPIRAL 3
            // Planning:
            // Add Deposit and Withdraw operations.
            //
            // Risk Analysis:
            // Prevent negative balance.
            // Prevent invalid transaction amounts.
            //
            // Engineering:
            // Deposit and Withdraw implementation.
            //
            // Evaluation:
            // Banking system approved.
            // =================================================

            System.out.println("\n====== BANKING MENU ======");
            System.out.println("1. Deposit");
            System.out.println("2. Withdraw");
            System.out.println("3. Exit");

            System.out.print("Enter Your Choice : ");
            int choice = sc.nextInt();

            switch (choice) {

                case 1:
                    System.out.print("Enter Deposit Amount : ₹");
                    double deposit = sc.nextDouble();

                    if (deposit > 0) {
                        balance += deposit;
                        System.out.println("Deposit Successful.");
                    } else {
                        System.out.println("Invalid Deposit Amount.");
                    }
                    break;

                case 2:
                    System.out.print("Enter Withdraw Amount : ₹");
                    double withdraw = sc.nextDouble();

                    if (withdraw > 0 && withdraw <= balance) {
                        balance -= withdraw;
                        System.out.println("Withdrawal Successful.");
                    } else {
                        System.out.println("Insufficient Balance or Invalid Amount.");
                    }
                    break;

                case 3:
                    System.out.println("Thank You for Using Online Banking.");
                    break;

                default:
                    System.out.println("Invalid Choice.");
            }

            System.out.println("Current Balance : ₹" + balance);

        } else {

            System.out.println("\nInvalid Username or Password.");

        }

        sc.close();
    }
}