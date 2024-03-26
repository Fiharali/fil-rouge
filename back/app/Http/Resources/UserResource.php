<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'city_id' => $this->city_id,
            'campus_id' => $this->campus_id,
            'promotion_id' => $this->promotion_id,
            'class_name_id' => $this->city_id,
            'level_id' => $this->level_id,
            'number' => $this->number,
            'level' => $this->level,
            'class_name' => $this->className,
            'promotion' => $this->promotion,
            'campus' => $this->campus,
            'city' => $this->city,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'image' => $this->getFirstMediaUrl('images'),
            'roles' => $this->roles->pluck('name'),
            'role_id' => $this->roles->pluck('id'),
        ];
    }
}
