class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.invalidCredentialsMessage = page.getByText('Invalid credentials', { exact: true });
    this.requiredFieldErrors = page.getByText('Required', { exact: true });
  }

  async navigateToLoginPage() {
    // Navigate to the OrangeHRM login page.
    await this.page.goto('https://opensource-demo.orangehrmlive.com/');
  }

  async login(username, password) {
    // Enter the username in the username field.
    await this.usernameInput.fill(username);

    // Enter the password in the password field.
    await this.passwordInput.fill(password);

    // Submit the login form.
    await this.loginButton.click();
  }

  getInvalidCredentialsMessage() {
    return this.invalidCredentialsMessage;
  }

  getRequiredFieldErrors() {
    return this.requiredFieldErrors;
  }
}

module.exports = { LoginPage };