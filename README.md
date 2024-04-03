# Utibu-Health-App
Utibu health is an inventory system that manages the stock of medication items, customer orders.


# Utibu Health Mobile App

Utibu Health is a mobile application designed to facilitate the ordering of medication remotely from a health facility. The app allows patients with chronic conditions such as HIV, diabetes, and hypertension to order their medication without visiting the facility physically. This README provides an overview of the functionalities, setup instructions, and other details about the app.

## Features

- **Order Medication**: Users can place orders for their medication remotely through the mobile app.
- **Confirmation**: Upon successful placement of an order, users receive confirmation indicating that the order has been processed.
- **Inventory Management**: The app integrates with the health facility's inventory system to manage stock, orders, sales, invoices, and payments.
- **Flexible Payment**: Users have the option to pay immediately or choose to pay later at the point of collection or receipt of their medication.

## About the App

Utibu Health aims to improve the convenience and accessibility of healthcare services for patients with chronic conditions. By allowing remote ordering of medication, the app reduces the need for physical visits to the health facility, particularly for routine prescription refills. This enhances the overall patient experience and promotes better adherence to medication regimens.

## Frontend

The frontend of Utibu Health is developed to provide a user-friendly interface for patients to interact with the application. It allows users to browse medications, place orders, and receive confirmations. The frontend is developed using React Native and Expo.

### Code Repository
The frontend code is located in the main/default branch of the repository. You can access it [here](https://github.com/Antoney20/Utibu-Health-App.git).

## Backend

The backend of Utibu Health serves as the server-side component responsible for handling requests, managing data, and performing business logic. It provides API endpoints for user authentication, medication management, order processing, and more. The backend is implemented using Python and Django REST Framework.

### Code Repository
The backend code is located in the master branch of the repository. You can access it [here](https://github.com/Antoney20/Utibu-Health-App.git/tree/master).

### API
The backend exposes RESTful API endpoints to interact with the application. It utilizes Django REST Framework for building robust APIs. The API supports functionalities such as user registration, authentication, medication listing, order placement, and order processing.


## Setting Up

To set up the Utibu Health app, follow these steps:

1. **Clone the Repository**: Clone the repository to your local machine.
2. **Install Dependencies**: Navigate to the project directory and install the necessary dependencies using `npm install` or `yarn install`.
3. **Configure Backend**: Set up the backend server using Django and MySQL. Ensure that the server is running and accessible.
4. **Configure Frontend**: Update the base URL in the frontend code to point to your backend server.
5. **Start ngrok Tunneling**: Run ngrok to expose your local server to the internet. Use the command `ngrok http <port>` and update the base URL in the frontend code to the ngrok URL.
6. **Run the App**: Start the mobile app using `npm start` or `yarn start`. Ensure that your mobile device or emulator is connected.

## Usage

1. **Login or Register**: Users need to log in or register to access the app.
2. **Browse Medications**: Users can browse available medications and select the ones they need.
3. **Place Order**: Users can place orders for their selected medications, specifying quantity and payment preference.
4. **Order Confirmation**: Upon successful submission, users receive confirmation of their order.
5. **Collect Medication**: Users can collect their medication from the health facility or choose to have it delivered.

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request.

## Contact

For questions or inquiries, please contact [Me](mailto:contact@utibuhealth.com).

---

By [Antoney20](https://www.utibuhealth.com)
