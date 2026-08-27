import { Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from './user.loger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface User {
    id: number;
    name: string;
    email?: string;
}

@Injectable()
export class UserService {
    constructor(private readonly logger: LoggerService) { }

    private users: User[] = [
        { id: 1, name: "John", email: "john@example.com" },
        { id: 2, name: "Jane", email: "jane@example.com" },
        { id: 3, name: "Bob", email: "bob@example.com" },
    ];

    private nextId = 4;

    findAllUsers(name: string = '') {
        this.logger.log("Find all users");

        return this.users.filter((user) =>
            user.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    findOneUser(id: number) {
        this.logger.log(`Find user by id: ${id}`);
        const user = this.users.find((u) => u.id === id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    createUser(createUserDto: CreateUserDto) {
        this.logger.log("Create user");
        const newUser: User = { id: this.nextId++, ...createUserDto };
        this.users.push(newUser);
        return newUser;
    }

    updateUser(id: number, updateUserDto: UpdateUserDto) {
        this.logger.log(`Update user by id: ${id}`);
        const user = this.findOneUser(id);
        return Object.assign(user, updateUserDto);
    }

    deleteUser(id: number) {
        this.logger.log(`Delete user by id: ${id}`);
        const user = this.findOneUser(id);
        this.users = this.users.filter((u) => u.id !== id);
        return { message: `User with ID ${id} deleted successfully`, user };
    }
}

