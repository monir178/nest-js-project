import { Controller, Get, Query } from '@nestjs/common';

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
}

