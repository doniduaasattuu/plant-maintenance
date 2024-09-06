<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Classification extends Model
{
    use HasFactory;

    protected $table = 'classifications';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $timestamps = true;

    public function equipments(): HasMany
    {
        return $this->hasMany(Equipment::class, 'classification_id', 'id');
    }
}
