<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EquipmentCheckingForm extends Model
{
    use HasFactory;

    protected $table = 'equipment_checking_forms';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $timestamps = true;
    public $incrementing = true;

    protected $fillable = [
        'id',
        'equipment_id',
        'formable_id',
        'formable_type',
        'created_at',
        'updated_at',
    ];

    public function formable()
    {
        return $this->morphTo();
    }

    public function equipment()
    {
        return $this->belongsTo(Equipment::class);
    }

    // public function isMotorCheck(): bool
    // {
    //     return $this->equipment->classification_id === "ZCLASS_E009";
    // }

    // public function isAcCheck(): bool
    // {
    //     return $this->equipment->classification_id === "ZCLASS_U001";
    // }
}
