import java.util.Scanner;

public class WaterfallCalculator {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        char choice;

        do {
            System.out.println("\n========== Calculator ==========");

            System.out.print("Enter First Number: ");
            double num1 = sc.nextDouble();

            System.out.print("Enter Second Number: ");
            double num2 = sc.nextDouble();

            System.out.println("\nChoose an Operation:");
            System.out.println("1. Addition");
            System.out.println("2. Subtraction");
            System.out.println("3. Multiplication");
            System.out.println("4. Division");
            System.out.println("5. Modulus");
            System.out.println("6. Square Root (First Number)");
            System.out.println("7. Power (num1 ^ num2)");
            System.out.println("8. Sine (First Number)");
            System.out.println("9. Cosine (First Number)");
            System.out.println("10. Tangent (First Number)");

            System.out.print("Enter your choice (1-10): ");
            int option = sc.nextInt();

            System.out.println("\n----- Result -----");

            switch (option) {

                case 1:
                    System.out.println("Addition = " + (num1 + num2));
                    break;

                case 2:
                    System.out.println("Subtraction = " + (num1 - num2));
                    break;

                case 3:
                    System.out.println("Multiplication = " + (num1 * num2));
                    break;

                case 4:
                    if (num2 != 0)
                        System.out.println("Division = " + (num1 / num2));
                    else
                        System.out.println("Division not possible (Cannot divide by zero).");
                    break;

                case 5:
                    if (num2 != 0)
                        System.out.println("Modulus = " + (num1 % num2));
                    else
                        System.out.println("Modulus not possible (Cannot divide by zero).");
                    break;

                case 6:
                    if (num1 >= 0)
                        System.out.println("Square Root = " + Math.sqrt(num1));
                    else
                        System.out.println("Square root of a negative number is not possible.");
                    break;

                case 7:
                    System.out.println("Power = " + Math.pow(num1, num2));
                    break;

                case 8:
                    System.out.println("Sin(" + num1 + ") = " + Math.sin(Math.toRadians(num1)));
                    break;

                case 9:
                    System.out.println("Cos(" + num1 + ") = " + Math.cos(Math.toRadians(num1)));
                    break;

                case 10:
                    System.out.println("Tan(" + num1 + ") = " + Math.tan(Math.toRadians(num1)));
                    break;

                default:
                    System.out.println("Invalid Choice!");
            }

            System.out.print("\nDo you want to perform another calculation? (Y/N): ");
            choice = sc.next().charAt(0);

        } while (choice == 'Y' || choice == 'y');

        System.out.println("\nThank you for using the Calculator!");
        sc.close();
    }
}