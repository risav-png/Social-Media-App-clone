import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentssDto } from './create-commentss.dto';

export class UpdateCommentssDto extends PartialType(CreateCommentssDto) {}
