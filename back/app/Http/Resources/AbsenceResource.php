<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AbsenceResource extends JsonResource
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
            'status' => $this->status,
            'date' => $this->date,
            'created_at' => $this->created_at,
            'type_id' => $this->type_id,
            'user_id' => $this->user_id,
            'type' => $this->type,
            'user' => new UserResource($this->user),
            'file' => $this->getFirstMediaUrl('absences'),
        ];
    }
}
