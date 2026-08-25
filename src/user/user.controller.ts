import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


const USERS = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jack Doe' },
    { id: 3, name: 'Bob Doe' },
];

@Controller('user')
export class UserController {
    // GET /user?name=...
    @Get()
    getUsers(@Query('name') name?: string) {
        if (name) {
            return USERS.filter((user) =>
                user.name.toLowerCase().includes(name.toLowerCase()),
            );
        }
        return USERS;
    }
    @Get(':id')
    getUsersById(@Param('id') id: string) {
        return { id, name: "John Doe" }
    }
    @Post()
    createUser(@Body() CreateUserDto: CreateUserDto) {
        return { data: CreateUserDto, message: "User created successfully" };
    }
    @Put(':id')
    updateUser(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto) {
        return { data: { id, ...UpdateUserDto }, message: "User updated successfully" };
    }
    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return { data: id, message: "User deleted successfully" };
    }
}

