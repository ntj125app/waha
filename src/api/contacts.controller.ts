import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { SessionManager } from '../core/abc/manager.abc';
import { SessionQuery } from '../structures/base.dto';
import {
  CheckNumberStatusQuery,
  WANumberExistResult,
} from '../structures/chatting.dto';
import { ContactQuery, ContactRequest } from '../structures/contacts.dto';

@ApiSecurity('api_key')
@Controller('api/contacts')
@ApiTags('👤 Contacts')
export class ContactsController {
  constructor(private manager: SessionManager) {}

  @Get('/')
  @ApiOperation({
    summary: 'Get contact basic info',
    description:
      'The method always return result, even if the phone number is not registered in WhatsApp. For that - use /contacts/check-exists endpoint below.',
  })
  get(@Query() query: ContactQuery) {
    const whatsapp = this.manager.getSession(query.session);
    return whatsapp.getContact(query);
  }

  @Get('/all')
  @ApiOperation({ summary: 'Get all contacts' })
  getAll(@Query() query: SessionQuery) {
    const whatsapp = this.manager.getSession(query.session);
    return whatsapp.getContacts();
  }

  @Get('/check-exists')
  @ApiOperation({ summary: 'Check phone number is registered in WhatsApp.' })
  async checkExists(
    @Query() request: CheckNumberStatusQuery,
  ): Promise<WANumberExistResult> {
    const whatsapp = this.manager.getSession(request.session);
    return whatsapp.checkNumberStatus(request);
  }

  @Get('/about')
  @ApiOperation({
    summary: 'Gets the Contact\'s "about" info',
    description:
      'Returns null if you do not have permission to read their status.',
  })
  getAbout(@Query() query: ContactQuery) {
    const whatsapp = this.manager.getSession(query.session);
    return whatsapp.getContactAbout(query);
  }

  @Get('/profile-picture')
  @ApiOperation({
    summary: "Get contact's profile picture URL",
    description:
      'If privacy settings do not allow to get the picture, the method will return null.',
  })
  getProfilePicture(@Query() query: ContactQuery) {
    const whatsapp = this.manager.getSession(query.session);
    return whatsapp.getContactProfilePicture(query);
  }

  @Post('/block')
  @ApiOperation({ summary: 'Block contact' })
  block(@Body() request: ContactRequest) {
    const whatsapp = this.manager.getSession(request.session);
    return whatsapp.blockContact(request);
  }

  @Post('/unblock')
  @ApiOperation({ summary: 'Unblock contact' })
  unblock(@Body() request: ContactRequest) {
    const whatsapp = this.manager.getSession(request.session);
    return whatsapp.unblockContact(request);
  }
}
