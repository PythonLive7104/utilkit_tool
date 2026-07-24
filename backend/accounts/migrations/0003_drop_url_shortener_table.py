from django.db import migrations


class Migration(migrations.Migration):
    """
    Teardown for the removed `url_shortener` app.

    The link shortener was removed from UtilKit after an abuse report: it was an
    open, unauthenticated redirector and was used to launder a phishing link
    (utilkit.us/s/ionos-wb -> fake IONOS login) behind our domain. Like the
    disposable-email tool before it, a URL shortener is abuse-associated, so the
    app, its routes, and its code are gone. This migration drops its orphaned
    table and cleans the migration history. It lives in `accounts` because
    `url_shortener` is no longer an installed app and can't own a migration.

    Raw SQL keeps it portable across Postgres (production) and SQLite (dev):
    `DROP TABLE IF EXISTS` is supported by both.
    """

    dependencies = [
        ('accounts', '0002_drop_temp_email_tables'),
    ]

    operations = [
        migrations.RunSQL(
            sql=[
                'DROP TABLE IF EXISTS url_shortener_shorturl;',
                "DELETE FROM django_migrations WHERE app = 'url_shortener';",
            ],
            reverse_sql=migrations.RunSQL.noop,
        ),
    ]
