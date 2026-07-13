import java.util.Scanner;

public class ATMPrototypeModel {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        // ===============================================
        // PROTOTYPE MODEL - ATM SYSTEM
        // ===============================================

        // -----------------------------------------------
        // STEP 1 : INITIAL PROTOTYPE
        // Feature:
        // Display ATM Menu and accept user choice.
        // -----------------------------------------------

        double balance = 10000;

        System.out.println("========== ATM SYSTEM ==========");
        System.out.println("1. Balance Enquiry");
        System.out.println("2. Deposit");
        System.out.println("3. Withdraw");
        System.out.println("4. Exit");

        System.out.print("Enter Your Choice : ");
        int choice = sc.nextInt();

        // -----------------------------------------------
        // USER FEEDBACK
        // Users requested that the ATM should actually
        // perform banking operations instead of only
        // displaying the selected option.
        // -----------------------------------------------

        // -----------------------------------------------
        // STEP 2 : IMPROVED PROTOTYPE
        // New Features:
        // 1. Balance Enquiry
        // 2. Deposit
        // 3. Withdraw
        // -----------------------------------------------

        switch (choice) {

            case 1:
                System.out.println("\nCurrent Balance : ₹" + balance);
                break;

            case 2:
                System.out.print("\nEnter Deposit Amount : ₹");
                double deposit = sc.nextDouble();

                balance = balance + deposit;

                System.out.println("Amount Deposited Successfully.");
                System.out.println("Updated Balance : ₹" + balance);
                break;

            case 3:
                System.out.print("\nEnter Withdraw Amount : ₹");
                double withdraw = sc.nextDouble();

                if (withdraw <= balance) {
                    balance = balance - withdraw;
                    System.out.println("Amount Withdrawn Successfully.");
                    System.out.println("Remaining Balance : ₹" + balance);
                } else {
                    System.out.println("Insufficient Balance.");
                }
                break;

            case 4:
                System.out.println("\nThank You for Using Our ATM.");
                break;

            default:
                System.out.println("\nInvalid Choice.");
        }

        // -----------------------------------------------
        // STEP 3 : FINAL PRODUCT
        // Additional Features that can be added after
        // customer feedback:
        //
        // • PIN Authentication
        // • Mini Statement
        // • Change PIN
        // • Fast Cash
        // • Transaction History
        // • Money Transfer
        // -----------------------------------------------

        sc.close();
    }
}