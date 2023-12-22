import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SigninDto } from 'src/dtos/users/signin.dto';
import { SignupDto } from 'src/dtos/users/signup.dto';
import { UpdateUserDto } from 'src/dtos/users/updateuser.dto';
import { FindOneUserResponse } from 'src/responses/users/findOneUser.response';
import { FindAllUsersResponse } from 'src/responses/users/getusers.response';
import { RemoveOneUserResponse } from 'src/responses/users/removeOneUser.response';
import { SigninResponse } from 'src/responses/users/signin.response';
import { SignupResponse } from 'src/responses/users/signup.response';
import { UpdateOneUserResponse } from 'src/responses/users/updateOneUser.reposnse';
import { UsersService } from 'src/services/users/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
    this.usersService = usersService;
  }

  @ApiResponse({
    status: 200,
    description: 'Returns the users service status',
    type: [String],
  })
  @Get('/')
  healthCheck(): string {
    return 'ok';
  }

  @ApiResponse({
    status: 200,
    description: 'Returns an array of users',
    type: [FindAllUsersResponse],
  })
  @Get('list')
  async findAll(): Promise<FindAllUsersResponse[]> {
    return await this.usersService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Returns a user by id',
    type: [FindOneUserResponse],
  })
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<FindOneUserResponse> {
    return await this.usersService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Remove an user by id',
    type: [RemoveOneUserResponse],
  })
  @Delete('remove/:id')
  async removeOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<RemoveOneUserResponse> {
    return await this.usersService.removeOne(id);
  }

  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'User updated',
    type: UpdateOneUserResponse,
  })
  @Put('update/:id')
  async updateOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: Partial<UpdateUserDto>,
  ): Promise<UpdateOneUserResponse> {
    return await this.usersService.updateOne(id, user);
  }

  @ApiBody({ type: SignupDto })
  @ApiResponse({
    status: 200,
    description: 'User created',
    type: SignupResponse,
  })
  @Post('signup')
  async signup(@Body() signupDto: SignupDto): Promise<SignupResponse> {
    try {
      return await this.usersService.signup(signupDto);
    } catch (error) {
      return error;
    }
  }

  @ApiBody({ type: SigninDto })
  @ApiResponse({
    status: 200,
    description: 'Sign in successful',
    type: SigninResponse,
  })
  @Post('signin')
  async signIn(@Body() signinDto: SigninDto): Promise<SigninResponse> {
    return await this.usersService.signin(signinDto);
  }
}
