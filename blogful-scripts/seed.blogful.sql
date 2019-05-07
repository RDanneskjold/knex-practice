BEGIN;

INSERT INTO blogful_articles
    (title, date_published, content)
VALUES
    ('a', now() - '29 days'::INTERVAL, 'a content'),
    ('b', now() - '29 days'::INTERVAL, 'b content'),
    ('c', now() - '29 days'::INTERVAL, 'c content'),
    ('d', now() - '29 days'::INTERVAL, 'd content'),
    ('e', now() - '29 days'::INTERVAL, 'e content'),
    ('f', now() - '27 days'::INTERVAL, 'f content'),
    ('g', now() - '27 days'::INTERVAL, 'g content'),
    ('h', now() - '27 days'::INTERVAL, 'h content'),
    ('i', now() - '27 days'::INTERVAL, 'i content'),
    ('j', now() - '20 days'::INTERVAL, 'j content'),
    ('k', now() - '20 days'::INTERVAL, 'k content'),
    ('l', now() - '20 days'::INTERVAL, 'l content'),
    ('m', now() - '15 days'::INTERVAL, 'm content'),
    ('n', now() - '15 days'::INTERVAL, 'n content'),
    ('o', now() - '15 days'::INTERVAL, 'o content'),
    ('p', now() - '8 days'::INTERVAL, 'p content'),
    ('q', now() - '8 days'::INTERVAL, 'q content'),
    ('r', now() - '5 days'::INTERVAL, 'r content'),
    ('s', now() - '2 days'::INTERVAL, 's content'),
    ('t', now() - '1 days'::INTERVAL, 't content');

COMMIT;