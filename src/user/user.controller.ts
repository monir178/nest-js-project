import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService, type User } from './user.service';
import { RoleGuard } from 'src/guards/role.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    // GET /user?name=...
    @Get()
    getUsers(@Query('name') name?: string): User[] {
        return this.userService.findAllUsers(name);
    }

    @Get(':id')
    getUsersById(@Param('id', ParseIntPipe) id: number): User {
        return this.userService.findOneUser(id);
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto): User {
        return this.userService.createUser(createUserDto);
    }

    @Put(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): User {
        return this.userService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    @UseGuards(RoleGuard)
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id);
    }
}


