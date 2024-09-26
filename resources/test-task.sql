create database if not exists test_task;

use test_task;

drop table if exists user_event;
drop table if exists user;
drop table if exists event;

create table user (
	id int not null auto_increment,
    full_name varchar(100) not null,
    email varchar(100) not null unique,
    birthdate date not null,
    constraint PK_user primary key (id)
);

create table event (
	id int not null auto_increment,
    title varchar(100) not null,
    description varchar(400) not null,
    date date not null,
    organizer varchar(100) not null,
    constraint PK_event primary key (id)
);

create table user_event (
    user_id int,
    event_id int,
    source_info enum('Social media', 'Friends', 'Found myself') NOT NULL,
    constraint PK_user_event primary key (user_id, event_id)
);

alter table user_event add constraint FK_User_event_user foreign key (user_id)
    references user (id);
    
alter table user_event add constraint FK_User_event_event foreign key (event_id)
    references event (id);



insert into event (title, description, date, organizer)
values 
('Tech Conference 2024', 'A conference about the latest in technology.', '2024-10-05', 'Tech Group'),
('Music Festival 2024', 'A festival featuring various artists and bands.', '2024-09-30', 'Music Company'),
('Art Exhibition 2024', 'An exhibition of modern art.', '2024-12-01', 'Art Studio'),
('Food Fair 2024', 'A fair with food from various cultures.', '2024-11-15', 'Food Lovers Inc.'),
('Startup Meetup 2024', 'Meetup for entrepreneurs and startups.', '2024-10-20', 'Startup Hub'),
('Fashion Week 2024', 'The biggest fashion week of the year.', '2024-09-25', 'Fashionista Group'),
('Film Premiere 2024', 'Premiere of the latest blockbuster.', '2024-11-10', 'Movie Studios'),
('Science Fair 2024', 'Showcasing groundbreaking scientific projects.', '2024-12-10', 'Science Org'),
('Literary Festival 2024', 'A celebration of literature and authors.', '2024-09-18', 'Writers Guild'),
('Tech Expo 2024', 'An exhibition of new technology and gadgets.', '2024-11-05', 'Innovators Inc.'),
('Gaming Convention 2024', 'A convention for gaming enthusiasts.', '2024-12-15', 'Gaming Co.'),
('Health Summit 2024', 'A summit on health and wellness.', '2024-10-10', 'Health First'),
('Eco Conference 2024', 'A conference on sustainability and the environment.', '2024-11-12', 'EcoWorld'),
('Photography Exhibition 2024', 'An exhibition of professional photography.', '2024-12-22', 'Photo Studio'),
('Sports Gala 2024', 'A gala celebrating sports achievements.', '2024-10-01', 'Sports Club'),
('Marathon 2024', 'Annual city marathon.', '2024-09-28', 'Athletics Association'),
('Robotics Competition 2024', 'A competition of robotics teams.', '2024-11-22', 'Robotics Corp.'),
('Craft Fair 2024', 'A fair with handmade crafts and goods.', '2024-12-05', 'Craftspeople Association'),
('Theater Festival 2024', 'A festival featuring theatrical performances.', '2024-10-15', 'Theater Group'),
('Music Awards 2024', 'Annual music awards ceremony.', '2024-11-28', 'Music Association'),
('Comic Convention 2024', 'A convention for comic book fans.', '2024-09-12', 'Comic Creators'),
('AI Summit 2024', 'Summit focused on AI advancements.', '2024-11-18', 'AI Research Institute'),
('Yoga Retreat 2024', 'A retreat focused on yoga and wellness.', '2024-12-18', 'Wellness Retreats'),
('Tech Hackathon 2024', 'A 48-hour hackathon for tech enthusiasts.', '2024-10-08', 'Hackers United'),
('Wine Tasting 2024', 'An event for wine enthusiasts.', '2024-11-25', 'Wine Club'),
('Wine Tasting 2024', 'An event for wine enthusiasts.', '2024-11-25', 'Wine Club');

