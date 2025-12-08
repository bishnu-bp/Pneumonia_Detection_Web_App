# Django Coursework Project

A full-stack web application built with the Django framework, demonstrating core web development.
## Installation

### Prerequisites

- Python 3.8 or higher
- pip package manager


### Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/Bishnu-alt/djangocoursework.git
cd djangocoursework
```

2. Create and activate a virtual environment:
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Apply database migrations:
```bash
python manage.py migrate
```

5. Create superuser account:
```bash
python manage.py createsuperuser
```

6. Run development server:
```bash
python manage.py runserver
```

7. Access the application at `http://127.0.0.1:8000/`


## Configuration

For production deployment, update the following in `settings.py`:

- Set `DEBUG = False`
- Configure `ALLOWED_HOSTS`
- Update `SECRET_KEY`
- Configure production database settings
- Set up static files serving

## Contributing

This is a coursework project. If you'd like to suggest improvements:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is created for educational purposes as part of coursework requirements.

## Author

**Bishnu**
- GitHub: [@Bishnu-alt](https://github.com/Bishnu-alt)

## Acknowledgments

- Django documentation and community
- Course instructors and materials
