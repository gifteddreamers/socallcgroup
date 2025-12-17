CREATE TABLE `mockup_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`description` text NOT NULL,
	`mockupImageUrl` varchar(500),
	`enhancedPrompt` text,
	`status` varchar(50) NOT NULL DEFAULT 'pending',
	`errorMessage` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `mockup_requests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `mockup_requests` ADD CONSTRAINT `mockup_requests_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;