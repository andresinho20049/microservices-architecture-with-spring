# Commit Guidelines and Best Practices
Contribution Guidelines: Code Quality, Committing, and Collaboration

## Introduction:
As we strive to build a robust and maintainable codebase, it is essential to establish a set of guidelines that support our development process. These guidelines are designed to ensure consistency and clarity in our coding practices.

The following document outlines the conventions and best practices used in this project, including Java coding standards, Spring Boot configuration, security settings, and OAuth2 integration. By understanding these practices, you'll gain insight into how we work and be able to contribute effectively to our project.

## Commit Practices:
**1. Write descriptive commit messages**

A well-crafted commit message should be concise, clear, and informative. It should summarize the changes made in the commit and provide context for future developers who might need to understand what was changed.

* Use the present tense ("Add feature" instead of "Added feature")
* Keep it short (50-72 characters or less)
* Use imperative mood ("Fix bug" instead of "Fixed bug")

Example:
`feat: Add new user authentication system`

**2. Follow the commit message format**

Use one of the following formats to structure your commit messages:

* `type(feature, fix, refactor, etc.): brief description`
* `[type] Brief description`

Common types include:

* `feat:` for new features
* `fix:` for bug fixes
* `refactor:` for code refactoring
* `docs:` for documentation updates

**3. Use meaningful commit subject lines**

The first line of your commit message is the most important one. It should be a clear and concise summary of the changes made in the commit.

Example:
`feat: Implement new user authentication system`

**4. Write detailed commit body (optional)**

If you need to provide additional context or explanation for your commit, use the commit body (the text after the subject line). Keep it brief and focused on the essential information.

Example:

```
feat: Implement new user authentication system

This commit adds a new user authentication system to our application. It includes the following changes:
- Added a new `auth` module
- Implemented user registration and login functionality
- Updated existing code to use the new auth system
```

**5. Use Git hooks for automated checks**

Git hooks can help you enforce best practices by running scripts before or after committing changes.

* For example, you can write a pre-commit hook to check if your commit message follows the desired format.
* You can also use a post-commit hook to run tests and ensure that the code is working as expected.

**6. Keep commits atomic**

Each commit should be self-contained and focused on a single change or set of related changes. This makes it easier to review, test, and revert individual commits if needed.

Example: Instead of committing all changes at once, break them down into separate commits for each feature or bug fix.

**7. Use meaningful commit IDs**

Use descriptive commit IDs that reflect the contents of your commit. Avoid using generic or sequential IDs like `commit 12345`.

**8. Review and test before pushing**

Always review your code and run tests locally before pushing to a shared repository. This ensures that your changes are correct and don't introduce any regressions.

By following these best practices, you'll maintain a clean, organized, and easy-to-review codebase. Happy committing!



### More types of Git commit messages:

**1. `feat:` - New feature**

* Used for introducing new functionality or features.
* Example:
	+ `feat: Implement new user authentication system`
	+ `feat: Add support for multiple languages`

**2. `fix:` - Bug fix**

* Used for fixing bugs or errors in the codebase.
* Examples:
	+ `fix: Fix typo in login page`
	+ `fix: perf: Optimize database queries for improved performance`
	+ `fix: test: Update unit tests to reflect new functionality`

**3. `refactor:` - Code refactoring**

* Used for improving the existing code structure, architecture, or design.
* Examples:
	+ `refactor: Simplify login function`
	+ `refactor: Extract common logic into separate module`
	+ `refactor: Improve code readability and organization`

**4. `docs:` - Documentation update**

* Used for updating documentation, such as README files, API documentation, or other supporting materials.
* Examples:
	+ `docs: Update API documentation to reflect new endpoints`
	+ `docs: Add example usage of new feature in README`
	+ `docs: Improve code comments and explanations`

**5. `style:` - Code formatting or styling change**

* Used for changing code style, formatting, or structure.
* Examples:
	+ `style: Consistent spacing and indentation throughout codebase`
	+ `style: Rename variables to follow consistent naming conventions`
	+ `style: Update code formatting to match team standards`

**6. `perf:` - Performance improvement**

* Used for optimizing the code to improve performance, scalability, or efficiency.
* Examples:
	+ `perf: Optimize database queries for improved performance`
	+ `perf: Implement caching mechanism for frequently accessed data`
	+ `perf: Improve rendering times by reducing DOM manipulation`

**7. `test:` - Test-related change**

* Used for adding, updating, or removing tests.
* Examples:
	+ `test: Add unit test for login function`
	+ `test: Update integration tests to reflect new functionality`
	+ `test: Remove unnecessary test cases`

**8. `chore:` - Miscellaneous task**

* Used for tasks that don't fit into other categories, such as updating dependencies, cleaning up the codebase, or running maintenance scripts.
* Examples:
	+ `chore: Update dependencies to latest versions`
	+ `chore: Clean up unused code and remove unnecessary files`
	+ `chore: Run automated tests and fix any failures`

**9. `ci:` - Continuous Integration update**

* Used for changes related to Continuous Integration (CI) pipelines, such as updating build scripts or configuration files.
* Examples:
	+ `ci: Update build script for new dependency`
	+ `ci: Configure CI pipeline to run on specific branch`
	+ `ci: Add automated testing to CI pipeline`

**10. `init:` - Initial setup**

* Used for the initial setup of a project, such as creating the repository, initializing version control, or setting up dependencies.
* Example:
	+ `init: Create new repository and initialize Git`

**11. `struct:` - Structural changes**

* Used for significant structural changes to the codebase, such as reorganizing modules or introducing a new architecture.
* Examples:
	+ `struct: Reorganize modules into separate packages`
	+ `struct: Introduce new microservices-based architecture`
	+ `struct: Update project structure to reflect changing requirements`

**12. `revert:` - Reverting a previous commit**

* Used for reverting a previous commit that was already pushed to the shared repository.
* Examples:
	+ `revert: Revert previous fix: typo in login page`
	+ `revert: Revert changes made in previous commit`

By using these commit message types, you can create a clear and organized commit history that makes it easy for others (and yourself!) to understand what changes have been made.

**Best Practices for Implementation:**
1. **Use version control**: Our project uses Git as our version control system. Familiarize yourself with Git commands and best practices.
2. **Write tests**: Write unit tests, integration tests, or other types of tests to ensure your code works correctly and consistently.
3. **Document your code**: Use comments and documentation to explain complex logic, dependencies, and assumptions.
4. **Use Java 17 features**: Familiarize yourself with Java 17 features, such as Records, Sealed Classes, and Switch Expressions.
5. **Follow Spring Boot conventions**: Adhere to standard Spring Boot practices, including using the `@SpringBootApplication` annotation and configuring in the `application.(properties | yaml)` file.

**Additional Resources:**
* [Git Documentation](https://git-scm.com/docs)
* [Spring Guides](https://spring.io/guides)
* [Spring Authorization Server Reference](https://docs.spring.io/spring-authorization-server/reference/index.html)

By following these guidelines and best practices, we can maintain a high-quality repository that is easy to contribute to and maintain.

Feel free to modify this sample to fit your project's specific needs.