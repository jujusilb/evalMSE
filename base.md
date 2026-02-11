create database if not exists evalGPA;

use evalGPA;



delete from recette;

delete from plat;

delete from ingredient;



drop table if exists ingredient;

create table ingredient(

id int not null auto\_increment primary key,

label varchar(20)

)engine=innodb;



drop table if exists plat;

create table plat(

id int not null auto\_increment primary key,

label varchar(20)

)engine=innodb;



drop table if exists recette;

create table recette(

ingredient\_id int,

plat\_id int

)engine=innodb;



alter table recette add constraint recette\_plat foreign key(plat\_id) references plat(id);

alter table recette add constraint recette\_ingredient foreign key(ingredient\_id) references ingredient(id);





insert into ingredient(id, prix, label) values (1, 2, "Farine"); 
insert into ingredient(id, prix, label) values (2, 3, "Œufs");
insert into ingredient(id, prix, label) values (3, 1, "Lait");
insert into ingredient(id, prix, label) values (4, 2, "Beurre"); 
insert into ingredient(id, prix, label) values (5, 5, "Sucre");
insert into ingredient(id, prix, label) values (6, 4, "Pommes de terre");
insert into ingredient(id, prix, label) values (7, 8, "Oignons");
insert into ingredient(id, prix, label) values (8, 1, "Pâtes");
insert into ingredient(id, prix, label) values (9, 1, "Tomates");
insert into ingredient(id, prix, label) values (10, 2, "Fromage"); 
insert into ingredient(id, prix, label) values (11, 3, "Ail");
insert into ingredient(id, prix, label) values (12, 2, "Sel / Poivre");
insert into ingredient(id, prix, label) values (13, 4, "Herbes de Provence");
insert into ingredient(id, prix, label) values (14, 8, "Bouillon");
insert into ingredient(id, prix, label) values (15, 2, "Pain");


insert into plat(id, label) values (1, "creoe");
insert into plat(id, label) values (2, "Pâtes sauce tomate");
insert into plat(id, label) values (3, "Gratin de pommes de terre");
insert into plat(id, label) values (4, "Soupe à l'oignon");
insert into plat(id, label) values (5, "Omelette aux pommes de terre");
insert into plat(id, label) values (6, "Pain perdu");
insert into plat(id, label) values (7, "Gnocchis express");
insert into plat(id, label) values (8, "Gnocchis express");
insert into plat(id, label) values (9, "Bruschetta tomate-fromage");
insert into plat(id, label) values (10, "Pâtes au fromage et ail");
insert into plat(id, label) values (11, "Sauce tomate épaisse pour dip");

insert into recette (id, platId, ingredientId) values(1,1,1);
insert into recette (id, platId, ingredientId) values(2,1,2);
insert into recette (id, platId, ingredientId) values(3,1,3);
insert into recette (id, platId, ingredientId) values(4,1,4);
insert into recette (id, platId, ingredientId) values(5,1,5);
insert into recette (id, platId, ingredientId) values(6,2,8);
insert into recette (id, platId, ingredientId) values(7,2,9);
insert into recette (id, platId, ingredientId) values(8,2,7);
insert into recette (id, platId, ingredientId) values(9,2,11);
insert into recette (id, platId, ingredientId) values(10,2,13);
insert into recette (id, platId, ingredientId) values(11,2,12);
insert into recette (id, platId, ingredientId) values(12,3,6);
insert into recette (id, platId, ingredientId) values(13,3,3);
insert into recette (id, platId, ingredientId) values(14,3,11);
insert into recette (id, platId, ingredientId) values(15,3,10);
insert into recette (id, platId, ingredientId) values(16,3,4);
insert into recette (id, platId, ingredientId) values(17,3,12);
insert into recette (id, platId, ingredientId) values(18,4,7);
insert into recette (id, platId, ingredientId) values(19,4,14);
insert into recette (id, platId, ingredientId) values(20,4,4);
insert into recette (id, platId, ingredientId) values(21,4,10);
insert into recette (id, platId, ingredientId) values(22,4,12);
insert into recette (id, platId, ingredientId) values(23,5,2);
insert into recette (id, platId, ingredientId) values(24,5,6);
insert into recette (id, platId, ingredientId) values(25,5,7);
insert into recette (id, platId, ingredientId) values(26,5,4);
insert into recette (id, platId, ingredientId) values(27,5,12);

(Omelette aux pommes de terre) : 
Œufs, pommes de terre, oignons, beurre, sel / poivre.
(Pain perdu) : 
Pain, lait, œufs, sucre, beurre.
(Gnocchis express) : 
Pommes de terre, farine, œuf, beurre, sel / poivre.
(Bruschetta tomate-fromage) : 
Pain, ail, tomates, fromage, herbes de Provence, sel / poivre.
(Pâtes au fromage et ail) : 
Pâtes, beurre, ail, fromage, sel / poivre.
(Sauce tomate épaisse pour dip) : 
Tomates, oignons, ail, sucre , herbes de Provence, sel / poivre.

