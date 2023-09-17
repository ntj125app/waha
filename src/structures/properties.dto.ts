import { ApiProperty } from '@nestjs/swagger';
import { WAHAEvents } from './enums.dto';

function ChatIdProperty(options = undefined) {
  options = options || {};
  if (!options.example) {
    options.example = '11111111111@c.us';
  }
  return ApiProperty(options);
}

function MessageIdProperty() {
  return ApiProperty({
    description: 'Message ID',
    example: 'false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA',
  });
}

export { ChatIdProperty, MessageIdProperty };
