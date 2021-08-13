drop table if exists `opinions`;

create table `opinions`(
	`id` int(11) not null auto_increment,
	`openid` varchar(100) not null,
	`src` text default null,
	`wechat` varchar(100) default null,
	`opinion` text not null,
	`create_time` timestamp not null default current_timestamp,
	primary key(`id`)
)default charset=`utf8`;


drop table if exists `records`;

create table `records`(
	`id` int(11) not null auto_increment,
	`openid` varchar(100) not null,
	`add` int(11) not null,
	`mark` int(11) not null,
	`note` varchar(100) default null,
	`create_time` timestamp not null default current_timestamp,
	primary key(`id`)
)default charset=`utf8`;