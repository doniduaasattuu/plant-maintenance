<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EquipmentStatus extends Model
{
    use HasFactory;

    protected $table = 'equipment_status';
    protected $primaryKey = 'id';
    protected $keyType = 'int';

    protected $fillable = [
        'id',
        'keyword',
    ];

    public function equipments(): HasMany
    {
        return $this->hasMany(Equipment::class, 'equipment_status_id', 'id');
    }
}
